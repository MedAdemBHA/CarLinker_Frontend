import React, { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import {
    deleteCarWithID,
    deleteUserWithID,
} from '@/api/services/adminServices';
import StatisticItem from '@/components/commons/input/Tables/StatisticItem';
import TableCar from '@/components/commons/input/Tables/TableCar';
import TableUser from '@/components/commons/input/Tables/TableUser';
// Import TableCar component
import { useAuth } from '@/context/authContext/authContext';
import { queryClient } from '@/main';

import DeleteConfirmationModal from '../modals/DeleteConfirmationModal';

import toast from 'react-hot-toast';

interface DashboardProps {
    statistics?: Statistic[];
    users?: User[];
    cars?: Car[];
    name: string;
    headings: string[];
}

const Dashboard: React.FC<DashboardProps> = ({
    statistics,
    users,
    cars,
    name,
    headings,
}) => {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<{
        type: 'user' | 'car';
        id: number;
    } | null>(null);
    const auth = useAuth();
    const token = auth.token || '';

    const deleteUser = useMutation(deleteUserWithID);
    const deleteCar = useMutation(deleteCarWithID);

    const openDeleteConfirmation = (type: 'user' | 'car', id: number) => {
        setItemToDelete({ type, id });
        setShowDeleteConfirmation(true);
    };

    const closeDeleteConfirmation = () => {
        setItemToDelete(null);
        setShowDeleteConfirmation(false);
    };

    const handleDeleteConfirmation = async () => {
        if (itemToDelete !== null) {
            try {
                if (itemToDelete.type === 'user') {
                    await deleteUser.mutateAsync(
                        {
                            token: token,
                            id: itemToDelete.id,
                        },
                        {
                            onSuccess: () => {
                                queryClient.invalidateQueries({
                                    queryKey: ['AllUsers'],
                                });
                                toast.success('User deleted successfully ', {
                                    style: {
                                        border: '1px solid #008000', // Green border
                                        padding: '16px',
                                        color: '#008000', // Green text color
                                    },
                                    iconTheme: {
                                        primary: '#008000', // Green icon color
                                        secondary: '#FFFFFF', // White background for the icon
                                    },
                                });
                            },
                        },
                    );
                } else if (itemToDelete.type === 'car') {
                    await deleteCar.mutateAsync(
                        {
                            token: token,
                            id: itemToDelete.id,
                        },
                        {
                            onSuccess: () => {
                                queryClient.invalidateQueries({
                                    queryKey: ['AllCars'],
                                });
                                toast.success('Car deleted successfully ', {
                                    style: {
                                        border: '1px solid #008000', // Green border
                                        padding: '16px',
                                        color: '#008000', // Green text color
                                    },
                                    iconTheme: {
                                        primary: '#008000', // Green icon color
                                        secondary: '#FFFFFF', // White background for the icon
                                    },
                                });
                            },
                        },
                    );
                }
            } catch (error) {
                console.error(`Failed to delete ${itemToDelete.type}:`, error);
            } finally {
                closeDeleteConfirmation();
            }
        }
    };

    return (
        <>
            <main className="content ml-12 transform ease-in-out duration-500  px-2 md:px-5 pb-4">
                <div className="flex">
                    <div className="container px-6 py-8 mx-auto">
                        <h3 className="text-3xl font-medium text-gray-700">
                            Dashboard {name}
                        </h3>

                        <div className="mt-4">
                            <div className="flex flex-wrap -mx-6">
                                {statistics?.map((statistic, index) => (
                                    <StatisticItem
                                        key={index}
                                        statistic={statistic}
                                    />
                                ))}
                            </div>
                        </div>

                        {users && (
                            <div className="flex flex-col mt-8">
                                <TableUser
                                    headings={headings}
                                    data={users}
                                    onDelete={(id) =>
                                        openDeleteConfirmation('user', id)
                                    }
                                />
                            </div>
                        )}

                        {cars && (
                            <div className="flex flex-col mt-8">
                                <TableCar
                                    headings={headings}
                                    data={cars}
                                    onDelete={(id) =>
                                        openDeleteConfirmation('car', id)
                                    }
                                />
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <DeleteConfirmationModal
                show={showDeleteConfirmation}
                onClose={closeDeleteConfirmation}
                onConfirm={handleDeleteConfirmation}
            />
        </>
    );
};

export default Dashboard;
