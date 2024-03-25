import React, { useEffect, useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { useMutation, useQuery } from '@tanstack/react-query';

import { getUserWithID, updateUserWithID } from '@/api/services/adminServices';
import { Input } from '@/components/commons/input/input';
import { useAuth } from '@/context/authContext/authContext';
import { queryClient } from '@/main';

type Item = {
    id: number;
    name?: string;
    email?: string;
    password?: string;
    isActive: boolean;
};

export default function EditUser() {
    const methods = useForm<Item>();
    const [userData, setUserData] = useState<Item | null>(null);
    const auth = useAuth();
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const token = auth.token || '';
    const mutation = useMutation(updateUserWithID);
    const getUserByID = useQuery(
        ['userData', id],
        () => getUserWithID(auth.token || '', id || ''),
        {
            onSuccess: (data) => {
                reset({
                    name: data?.name,
                    email: data?.email,
                    isActive: data?.isActive,
                });
                setUserData(data);
            },
        },
    );

    const { handleSubmit, register, reset } = methods;

    const onSubmit = async (data: Item) => {
        if (!auth.token || !id) {
            console.error('Authentication token or user ID is missing.');
            return;
        }
        try {
            await mutation.mutateAsync(
                { token: token, id, userData: data },
                {
                    onSuccess: () => {
                        navigate('/dashbord');
                    },
                },
            );
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <>
            <div className="flex justify-center items-center pt-20">
                <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 w-full max-w-3xl">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-around">
                        <div className="text-gray-600">
                            <p className="font-medium text-lg">
                                Update User Details
                            </p>
                            <p>Please fill out all the fields.</p>
                        </div>
                        <div className="md:ml-8 mt-4 md:mt-0 w-full md:w-auto">
                            <FormProvider {...methods}>
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="w-full"
                                >
                                    <div className="mb-4">
                                        <Input
                                            name="name"
                                            label="Name"
                                            type="name"
                                            icon="fa-solid fa-key"
                                            placeholder="Name"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <Input
                                            name="email"
                                            label="Email"
                                            type="email"
                                            icon="fa-solid fa-envelope"
                                            placeholder="Email"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                {...register('isActive')}
                                                className="form-checkbox mr-2 h-5 w-5 text-[#004AAD]"
                                            />
                                            <span className="text-gray-700">
                                                Active this account
                                            </span>
                                        </label>
                                    </div>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </FormProvider>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
