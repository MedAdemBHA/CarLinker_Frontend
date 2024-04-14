import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { useMutation, useQuery } from '@tanstack/react-query';

import { deleteCarWithID, getMyCars } from '@/api/services/userController';
import { baseUrl } from '@/apiConfig';
import noImages from '@/assets/HeroImages/ADD_UR_FIRST_CAR.png';
import { useAuth } from '@/context/authContext/authContext';
import { queryClient } from '@/main';

import DeleteConfirmationModal from '../modals/DeleteConfirmationModal';

import toast from 'react-hot-toast';

interface CarProps {
    id: number;
    manufacturer: string;
    model: string;
    mileage: string;
    price: number;
    year: string;
    status: boolean;
    description: string;
    location: string;
    imageFiles: string[];
}

const MyCarsComponent = () => {
    const [carsList, setCarsList] = useState<CarProps[]>([]);
    const auth = useAuth();
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [carIdToDelete, setCarIdToDelete] = useState<number | null>(null);
    const token = auth.token || '';

    const {
        data: myCars,
        error,
        isLoading,
    } = useQuery(['MyCars'], () => getMyCars(auth.token || ''), {
        onSuccess: (data) => {
            setCarsList(data);
        },
    });

    const openDeleteConfirmation = (id: number) => {
        setCarIdToDelete(id);
        setShowDeleteConfirmation(true);
    };

    const closeDeleteConfirmation = () => {
        setCarIdToDelete(null);
        setShowDeleteConfirmation(false);
    };

    const deleteCarMutation = useMutation(deleteCarWithID);

    const handleDeleteConfirmation = async () => {
        if (carIdToDelete) {
            try {
                await deleteCarMutation.mutateAsync(
                    {
                        token: token,
                        id: carIdToDelete,
                    },
                    {
                        onSuccess: () => {
                            queryClient.invalidateQueries({
                                queryKey: ['MyCars'],
                            });
                        },
                    },
                );
            } catch (error) {
                console.error('Failed to delete car');
            }
        }
    };

    if (isLoading) {
        return (
            <div className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
                <div className="p-2 md:p-4">
                    <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                        <h2 className="pl-6 text-2xl font-bold sm:text-xl">
                            My Cars
                        </h2>
                        <div className="grid max-w-8xl mx-auto x mt-8">
                            <form className="mb-2 sm:mb-6">
                                <div className="mb-4">
                                    <div className="animate-pulse bg-gray-200 h-36 w-full rounded-lg"></div>
                                </div>
                                <div className="mb-4">
                                    <div className="animate-pulse bg-gray-200 h-36 w-full rounded-lg"></div>
                                </div>
                                <div className="mb-4">
                                    <div className="animate-pulse bg-gray-200 h-36 w-full rounded-lg"></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
                <div className="p-2 md:p-4">
                    <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                        <h2 className="pl-6 text-2xl font-bold sm:text-xl">
                            My Cars
                        </h2>
                        <div className="grid max-w-8xl mx-auto x mt-8">
                            <form className="mb-2 sm:mb-6">
                                <div className="mb-4">
                                    <img src={noImages} alt="" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
            <div className="p-2 md:p-4">
                <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                    <h2 className="pl-6 text-2xl font-bold sm:text-xl">
                        My cars
                    </h2>
                </div>
                <div>
                    <div>
                        {carsList.map((car, index) => (
                            <div
                                className="max-w-md mx-auto bg-white rounded-xl mt-3 shadow-md overflow-hidden md:max-w-2xl relative"
                                key={index}
                            >
                                <div className="md:flex">
                                    <div className="md:shrink-0">
                                        <img
                                            className="h-48 w-full object-cover md:h-full md:w-64"
                                            src={`${baseUrl}${car.imageFiles[0]}`}
                                            alt={`${car.manufacturer} ${car.model}`}
                                        />
                                    </div>
                                    <div className="p-8">
                                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                                            {car.manufacturer} {car.model}
                                        </div>
                                        <p className="mt-2 text-slate-500">
                                            {car.description}
                                        </p>
                                        <p className="mt-2 text-slate-500">
                                            Mileage: {car.mileage} km
                                        </p>
                                        <p className="mt-2 text-slate-500">
                                            Year: {car.year}
                                        </p>
                                        <p className="mt-2 text-slate-500">
                                            Location: {car.location}
                                        </p>
                                        <p className="mt-2 text-slate-500">
                                            Price: ${car.price}
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 mt-2 mr-2">
                                    <Link
                                        to={`/addcar/update/${car.id}`}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() =>
                                            openDeleteConfirmation(car.id)
                                        }
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                                    >
                                        Delete
                                    </button>
                                </div>
                                <div className="absolute left-0 top-0 mt-2 ">
                                    <div
                                        className={`bg-${
                                            car.status ? 'green' : 'red'
                                        }-500 text-white font-bold py-2 px-4 rounded`}
                                    >
                                        {car.status ? 'Approved' : 'Pending'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <DeleteConfirmationModal
                show={showDeleteConfirmation}
                onClose={closeDeleteConfirmation}
                onConfirm={handleDeleteConfirmation}
            />
        </main>
    );
};

export default MyCarsComponent;
