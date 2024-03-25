import React, { useEffect, useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { useMutation, useQuery } from '@tanstack/react-query';

import { getMyProfile, updateProfile } from '@/api/services/userController';
import { Input } from '@/components/commons/input/input';
import { useAuth } from '@/context/authContext/authContext';
import { queryClient } from '@/main';

import toast from 'react-hot-toast';

type Item = {
    id: number;
    name?: string;
    email?: string;
    password?: string;
    city: string;
    phone: string;
    lastLoginDate: string;
};

export default function Profile() {
    const methods = useForm<Item>();
    const [userData, setUserData] = useState<Item | null>(null);
    const auth = useAuth();
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const token = auth.token || '';
    const mutation = useMutation(updateProfile);
    const MyProfile = useQuery(
        ['MyProfile', id],
        () => getMyProfile(auth.token || ''),
        {
            onSuccess: (data) => {
                reset({
                    name: data?.name,
                    email: data?.email,
                    city: data.city,
                    phone: data?.phone,
                });
                setUserData(data);
            },
        },
    );
    const formattedLastLogin = userData?.lastLoginDate
        ? new Date(userData.lastLoginDate).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
          })
        : 'Date unavailable';

    const { handleSubmit, reset } = methods;

    const onSubmit = async (data: Item) => {
        try {
            await mutation.mutateAsync(
                { token: token, userData: data },
                {
                    onSuccess: () => {
                        toast.success('Login successful!', {
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
                        navigate('/');
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
                                Update Your profile
                            </p>
                            <p>Please fill out all the fields.</p>
                            <p>Last login : {formattedLastLogin}</p>
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
                                        <Input
                                            name="city"
                                            label="city"
                                            type="name"
                                            icon="fa-solid fa-key"
                                            placeholder="city"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <Input
                                            name="phone"
                                            label="phone"
                                            type="name"
                                            icon="fa-solid fa-key"
                                            placeholder="Phone"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                        />
                                    </div>

                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        type="submit"
                                    >
                                        Update
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
