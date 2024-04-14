import { Suspense, useEffect, useState } from 'react';

import { Outlet, Route, Routes } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { getMyProfile } from '@/api/services/userController';
import MyAsideComponent from '@/components/ui/aside/aside';
import { useAuth } from '@/context/authContext/authContext';
import AdminRouter from '@/context/ProtectionRouter/AdminRouter';
import UserRouter from '@/context/ProtectionRouter/UserRouter';
import { queryClient } from '@/main';
import AccountSettings from '@/pages/main/AddCar/addFormCard';
import CarForm from '@/pages/main/AddCar/addFormCard';
import AdminDashboardCar from '@/pages/main/AdminDashbord/adminDashbordCar';
import AdminDashboardUsers from '@/pages/main/AdminDashbord/adminDashbordUsers';
import EditUser from '@/pages/main/AdminDashbord/editUser';
import Contact from '@/pages/main/Contact/contact';
import Explorecars from '@/pages/main/Expore Cars/explore';
import Home from '@/pages/main/Home';
import MainLayout from '@/pages/main/mainLayout';
import NotAccess from '@/pages/main/noacces/notAccess';
import NotFoundPage from '@/pages/main/notFound/notFound';
import Profile from '@/pages/main/User/Profile/profile';

import { TESelect } from 'tw-elements-react';

const MainRoutes = () => {
    const auth = useAuth();
    const MyProfile = useQuery(
        ['MyProfile'],
        () => getMyProfile(auth.token || ''),
        {
            enabled: auth.isConnected && auth.user?.userRole === 'USER',
            onSuccess: (data) => {
                auth.status({
                    isActive: data.isActive,
                });
            },
        },
    );

    const [user, setUser] = useState({
        isConnected: false,
        userRole: '',
    });

    useEffect(() => {
        setUser((prevUser) => ({
            ...prevUser,
            isConnected: auth.isConnected,
            userRole: auth.user?.userRole || '',
        }));
    }, [auth.isConnected, auth.user?.userRole]);

    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />

                <Route path="/Explore" element={<Explorecars />} />
                <Route
                    path="/myprofile"
                    element={
                        <UserRouter user={user}>
                            <Profile />
                        </UserRouter>
                    }
                />
                <Route
                    path="/dashbord"
                    element={
                        <AdminRouter user={user}>
                            <AdminDashboardUsers />
                        </AdminRouter>
                    }
                />
                <Route
                    path="/dashbord/car"
                    element={
                        <AdminRouter user={user}>
                            <AdminDashboardCar />
                        </AdminRouter>
                    }
                />
                <Route
                    path="/dashbord/:id"
                    element={
                        <AdminRouter user={user}>
                            <EditUser />
                        </AdminRouter>
                    }
                />

                <Route path="/contact" element={<Contact />} />
                <Route
                    path="/addcar"
                    element={
                        <UserRouter user={user}>
                            <Outlet />
                        </UserRouter>
                    }
                />

                <Route
                    path="/addcar/update/:id"
                    element={
                        <Suspense>
                            <CarForm />
                        </Suspense>
                    }
                />
                <Route
                    path="/addcar/new"
                    element={
                        <Suspense>
                            <CarForm />
                        </Suspense>
                    }
                />

                <Route path="*" element={<NotFoundPage />} />
                <Route path="/noaccess" element={<NotAccess />} />
            </Route>
        </Routes>
    );
};

export default MainRoutes;
