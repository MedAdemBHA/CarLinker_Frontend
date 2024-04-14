import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getmyCars } from '@/api/services/userController';
import { baseUrl } from '@/apiConfig';
import { useAuth } from '@/context/authContext/authContext';

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
    const [cars, setCars] = useState<CarProps[]>([]);
    const auth = useAuth();
    const token = auth.token || '';

    const {
        data: myCars,
        error,
        isLoading,
    } = useQuery(['MyCars'], () => getmyCars(auth.token || ''), {
        onSuccess: (data) => {
            setCars(data);
        },
        onError: (error: Error) => {
            toast.error('Failed to fetch cars: ' + error.message, {
                style: {
                    border: '1px solid #FF0000', // Red border
                    padding: '16px',
                    color: '#FF0000', // Red text color
                },
                iconTheme: {
                    primary: '#FF0000', // Red icon color
                    secondary: '#FFFFFF', // White background for the icon
                },
            });
        },
    });
    const handleDelete = (index: number) => {
        // Implement delete functionality here
        console.log(`Deleting car at index ${index}`);
    };

    const handleEdit = (index: number) => {
        // Implement edit functionality here
        console.log(`Editing car at index ${index}`);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
            <div className="p-2 md:p-4">
                <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                    <h2 className="pl-6 text-2xl font-bold sm:text-xl">
                        My cars
                    </h2>
                </div>
                <div>
                    {cars.map((car) => (
                        <div
                            key={car.id}
                            className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl relative"
                        >
                            <img
                                className="h-48 w-full object-cover md:h-full md:w-48"
                                src={`${baseUrl}${car.imageFiles[0]}`}
                                alt={`${car.manufacturer} ${car.model}`}
                            />
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
                                <div className="absolute top-0 right-0 mt-2 mr-2">
                                    <button
                                        onClick={() => handleEdit(car.id)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(car.id)}
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
                                        {car.status ? 'Available' : 'Sold'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default MyCarsComponent;
