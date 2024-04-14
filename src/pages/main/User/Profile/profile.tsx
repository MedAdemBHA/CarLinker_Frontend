import { useEffect, useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { useMutation, useQuery } from '@tanstack/react-query';

import { getMyProfile, updateProfile } from '@/api/services/userController';
import { Input } from '@/components/commons/input/input';
import MyCarsComponent from '@/components/ui/profileElement/MyCarsComponent';
import MyProfileComponent from '@/components/ui/profileElement/MyProfileComponent';
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
    const [selectedLink, setSelectedLink] = useState('profile');

    const renderComponent = () => {
        switch (selectedLink) {
            case 'profile':
                return <MyProfileComponent />;
            case 'cars':
                return <MyCarsComponent />;
            case 'appointment':
                return '<TestAppointmentComponent />';
            default:
                return null;
        }
    };

    return (
        <>
            <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
                {/* Sidebar */}
                <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
                    <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
                        <h2 className="pl-3 mb-4 text-2xl font-semibold">
                            Settings
                        </h2>
                        <button
                            className={`flex items-center px-3 py-2.5 font-bold bg-white ${
                                selectedLink === 'profile'
                                    ? 'text-blue-600 border rounded-full'
                                    : 'text-gray-600'
                            }  rounded-full`}
                            onClick={() => setSelectedLink('profile')}
                        >
                            My Profile
                        </button>
                        <button
                            className={`flex items-center px-3 py-2.5 font-semibold hover:text-blue-600 hover:border hover:rounded-full ${
                                selectedLink === 'cars'
                                    ? 'text-blue-600 border rounded-full'
                                    : 'text-gray-600'
                            }`}
                            onClick={() => setSelectedLink('cars')}
                        >
                            My Cars
                        </button>
                        <button
                            className={`flex items-center px-3 py-2.5 font-semibold hover:text-blue-600 hover:border hover:rounded-full ${
                                selectedLink === 'appointment'
                                    ? 'text-blue-600 border rounded-full'
                                    : 'text-gray-600'
                            }`}
                            onClick={() => setSelectedLink('appointment')}
                        >
                            Test Appointment
                        </button>
                    </div>
                </aside>
                {renderComponent()}
            </div>
        </>
    );
}
