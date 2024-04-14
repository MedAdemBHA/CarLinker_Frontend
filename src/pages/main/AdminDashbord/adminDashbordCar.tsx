import React from 'react';
import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import {
    getAllCars,
    getAllusers,
    getUserCounts,
} from '@/api/services/adminServices';
import Dashboard from '@/components/ui/dashbord/dashboard';
import Skeleton from '@/components/ui/dashbord/skeleton';
import { useAuth } from '@/context/authContext/authContext';
import { queryClient } from '@/main';

import toast from 'react-hot-toast';

const AdminDashboardCar = () => {
    const auth = useAuth();
    const [activeUsers, setActiveUsers] = useState(0);
    const [inactiveUsers, setInactiveUsers] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [carsData, setCarsData] = useState([]);

    const Allusers = useQuery(['AllCars'], () => getAllCars(auth.token || ''), {
        onSuccess: (data) => {
            setCarsData(data);
        },

        onError: (error: Error) => {
            toast.error(error.message, {
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

    const statisticsData = {
        statistics: [
            { count: totalUsers - 1, label: 'All Users' },
            { count: activeUsers - 1, label: 'Active Users' },
            { count: inactiveUsers, label: 'Inactive Users' },
        ],
    };

    return (
        <React.Fragment>
            {Allusers.isFetching ? (
                <Skeleton />
            ) : (
                <>
                    <Dashboard
                        headings={[
                            'Id',
                            'img',
                            'Car Mark',
                            'mileage',
                            'Seller Name',
                            'description',
                            'status',
                            'Edit',
                            'delete',
                        ]}
                        cars={carsData}
                        name="Cars"
                    />
                </>
            )}
        </React.Fragment>
    );
};

export default AdminDashboardCar;
