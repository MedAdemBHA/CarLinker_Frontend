import React, { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { deleteUserWithID } from '@/api/services/adminServices';
import StatisticItem from '@/components/commons/input/Tables/StatisticItem';
import Table from '@/components/commons/input/Tables/Table';
import { useAuth } from '@/context/authContext/authContext';
import { queryClient } from '@/main';

import MyAsideComponent from '../aside/aside';
import DeleteConfirmationModal from '../modals/DeleteConfirmationModal';

interface DashboardProps {
    statistics: Statistic[];
    users: User[];
}

const Dashboard: React.FC<DashboardProps> = ({ statistics, users }) => {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
    const auth = useAuth();
    const token = auth.token || '';

    const deleteUser = useMutation(deleteUserWithID);
    const openDeleteConfirmation = (id: number) => {
        setUserIdToDelete(id);
        setShowDeleteConfirmation(true);
    };

    const closeDeleteConfirmation = () => {
        setUserIdToDelete(null);
        setShowDeleteConfirmation(false);
    };

    const handleDeleteConfirmation = async () => {
        if (userIdToDelete) {
            try {
                await deleteUser.mutateAsync(
                    {
                        token: token,
                        id: userIdToDelete,
                    },
                    {
                        onSuccess: () => {
                            queryClient.invalidateQueries({
                                queryKey: ['Allusers'],
                            });
                        },
                    },
                );

                // Handle success message or refetch data if needed
            } catch (error) {
                console.error('Failed to delete user:', error);
                // Handle error, show error message, etc.
            } finally {
                closeDeleteConfirmation();
            }
        }
    };

    return (
        <>
            <MyAsideComponent />
            <main className="content ml-12 transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4">
                <div className="flex">
                    <div className="container px-6 py-8 mx-auto">
                        <h3 className="text-3xl font-medium text-gray-700">
                            Dashboard
                        </h3>

                        <div className="mt-4">
                            <div className="flex flex-wrap -mx-6">
                                {statistics.map((statistic, index) => (
                                    <StatisticItem
                                        key={index}
                                        statistic={statistic}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col mt-8">
                            <Table
                                headings={[
                                    'Name',
                                    'Last Login Date',
                                    'Status',
                                    'Role',
                                    'Edit',
                                    'delete',
                                ]}
                                data={users}
                                onDelete={openDeleteConfirmation}
                            />
                        </div>
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
