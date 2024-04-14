import React from 'react';

import { useMutation } from '@tanstack/react-query';

import { updateCarStatusID } from '@/api/services/adminServices';
import { baseUrl } from '@/apiConfig';
import { useAuth } from '@/context/authContext/authContext';
import { queryClient } from '@/main';

interface TableRowCarProps {
    car: Car;
    onDelete: (id: number) => void;
}

const TableRowCar: React.FC<TableRowCarProps> = ({ car, onDelete }) => {
    const mutation = useMutation(updateCarStatusID);
    const auth = useAuth();
    const token = auth.token || '';

    const handlePullUpdate = async () => {
        if (!auth.token) {
            console.error('Authentication token is missing.');
            return;
        }
        try {
            await mutation.mutateAsync(
                { token: token, id: car.id },
                {
                    onSuccess: () => {
                        queryClient.invalidateQueries({
                            queryKey: ['AllCars'],
                        });
                    },
                },
            );
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <tr>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-500">{car.id}</div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-500">
                    <img
                        className="w-[50px]"
                        src={`${baseUrl}${car.imageFiles[0]}`}
                        alt="Car Image"
                    />
                </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center">
                    <div className="s">
                        <div className="text-sm font-medium leading-5 text-gray-900">
                            {car.manufacturer} {car.model}
                        </div>
                        <div className="text-sm leading-5 text-gray-500">
                            {car.description}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-500">
                    {car.mileage} KM
                </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-500">
                    {car.name}
                </div>
            </td>
            <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                {car.description}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 ${
                        car.status
                            ? 'text-green-800 bg-green-100'
                            : 'text-red-800 bg-red-100'
                    }`}
                >
                    {car.status ? 'Active' : 'Inactive'}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <label className="inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={car.status}
                        onChange={handlePullUpdate}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
            </td>
            <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 ">
                <button
                    onClick={() => onDelete(car.id)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default TableRowCar;
