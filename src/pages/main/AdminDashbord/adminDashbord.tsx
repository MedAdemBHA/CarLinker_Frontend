import React from 'react';
import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getAllusers, getUserCounts } from '@/api/services/adminServices';
import Dashboard from '@/components/ui/dashbord/dashboard';
import Skeleton from '@/components/ui/dashbord/skeleton';
import { useAuth } from '@/context/authContext/authContext';
import { queryClient } from '@/main';

import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const auth = useAuth();
    const [activeUsers, setActiveUsers] = useState(0);
    const [inactiveUsers, setInactiveUsers] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [usersData, setUsersData] = useState([]);
    const userCounts = useQuery(
        ['userCounts'],
        () => getUserCounts(auth.token || ''),
        {
            onSuccess: (data) => {
                setActiveUsers(data.activeUsers);
                setInactiveUsers(data.inactiveUsers);
                setTotalUsers(data.totalUsers);
            },
        },
    );
    const Allusers = useQuery(
        ['Allusers'],
        () => getAllusers(auth.token || ''),
        {
            onSuccess: (data) => {
                setUsersData(data);
                queryClient.invalidateQueries({
                    queryKey: ['userCounts'],
                });
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
        },
    );

    const statisticsData = {
        statistics: [
            { count: totalUsers - 1, label: 'All Users' },
            { count: activeUsers - 1, label: 'Active Users' },
            { count: inactiveUsers, label: 'Inactive Users' },
        ],
    };

    return (
        <React.Fragment>
            {userCounts.isFetching && Allusers.isFetching ? (
                <Skeleton />
            ) : (
                <>
                    <Dashboard
                        statistics={statisticsData.statistics}
                        users={usersData}
                    />
                </>
            )}
        </React.Fragment>
    );
};

export default AdminDashboard;
