import { useEffect, useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { useMutation, useQuery } from '@tanstack/react-query';

import { getMyProfile, updateProfile } from '@/api/services/userController';
import { Input } from '@/components/commons/input/input';
import { useAuth } from '@/context/authContext/authContext';

import toast from 'react-hot-toast';

type Item = {
    id: number;
    name?: string;
    email?: string;
    password?: string;
    city: string;
    phone: string;
    lastLoginDate: string;
    isActive: boolean;
};

const MyProfileComponent = () => {
    const methods = useForm<Item>();
    const [userData, setUserData] = useState<Item | null>(null);

    const auth = useAuth();
    const navigate = useNavigate();
    const token = auth.token || '';
    const mutation = useMutation(updateProfile);
    const {
        data: myProfileData,
        error,
        isLoading,
    } = useQuery(['MyProfile'], () => getMyProfile(auth.token || ''), {
        onSuccess: (data) => {
            auth.status({
                isActive: data.isActive,
            });
            reset({
                name: data?.name,
                email: data?.email,
                city: data.city,
                phone: data?.phone,
            });
            setUserData(data);
        },
    });
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
    if (isLoading || error) {
        // Skeleton Loading UI
        return (
            <div className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
                <div className="p-2 md:p-4">
                    <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                        <h2 className="pl-6 text-2xl font-bold sm:text-xl">
                            My profile
                        </h2>
                        <div className="grid max-w-2xl mx-auto mt-8">
                            <form className="mb-2 sm:mb-6">
                                <div className="mb-4">
                                    <div className="animate-pulse bg-gray-200 h-8 w-full rounded-lg"></div>
                                </div>
                                <div className="mb-4">
                                    <div className="animate-pulse bg-gray-200 h-8 w-full rounded-lg"></div>
                                </div>
                                <div className="mb-4">
                                    <div className="animate-pulse bg-gray-200 h-8 w-full rounded-lg"></div>
                                </div>
                                <div className="mb-4">
                                    <div className="animate-pulse bg-gray-200 h-8 w-full rounded-lg"></div>
                                </div>
                                <div className="flex justify-end">
                                    <div className="animate-pulse bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-indigo-800"></div>
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
                        My profile
                    </h2>
                    <div className="grid max-w-2xl mx-auto mt-8">
                        <FormProvider {...methods}>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="mb-2 sm:mb-6"
                            >
                                <div className="mb-4">
                                    <p className="lock mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                        Last Login Date: {formattedLastLogin}
                                    </p>
                                </div>

                                <div className="mb-4">
                                    <Input
                                        name="name"
                                        label="Name"
                                        type="name"
                                        icon="fa-solid fa-key"
                                        placeholder="Name"
                                        classNameIN="bg-blue-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                        classNameLA="lock mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                                    />
                                </div>
                                <div className="mb-4">
                                    <Input
                                        name="email"
                                        label="Email"
                                        type="email"
                                        icon="fa-solid fa-envelope"
                                        placeholder="Email"
                                        classNameIN="bg-blue-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                        classNameLA="lock mb-2 text-sm font-medium text-blue-900 dark:text-white"
                                    />
                                </div>

                                <div className="mb-4">
                                    <Input
                                        name="city"
                                        label="city"
                                        type="name"
                                        icon="fa-solid fa-key"
                                        placeholder="city"
                                        classNameIN="bg-blue-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                        classNameLA="lock mb-2 text-sm font-medium text-blue-900 dark:text-white"
                                    />
                                </div>
                                <div className="mb-4">
                                    <Input
                                        name="phone"
                                        label="phone"
                                        type="name"
                                        icon="fa-solid fa-key"
                                        placeholder="Phone"
                                        classNameIN="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                        classNameLA="lock mb-2 text-sm font-medium text-blue-900 dark:text-white"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-indigo-800"
                                        type="submit"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default MyProfileComponent;
