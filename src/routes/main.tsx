import { Route, Routes } from 'react-router-dom';

import { useAuth } from '@/context/authContext/authContext';
import AdminRouter from '@/context/ProtectionRouter/AdminRouter';
import UserRouter from '@/context/ProtectionRouter/UserRouter';
import About from '@/pages/main/About';
import AdminDashboard from '@/pages/main/AdminDashbord/adminDashbord';
import EditUser from '@/pages/main/AdminDashbord/editUser';
import Contact from '@/pages/main/Contact';
import Home from '@/pages/main/Home';
import MainLayout from '@/pages/main/mainLayout';
import NotAccess from '@/pages/main/noacces/notAccess';
import NotFoundPage from '@/pages/main/notFound/notFound';
import Profile from '@/pages/main/User/Profile/profile';

const MainRoutes = () => {
    const auth = useAuth();
    const user = {
        isConnected: auth.isConnected,
        userRole: auth.user?.userRole || '',
    };
    console.log(user.userRole);
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />

                <Route path="/about" element={<About />} />
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
                            <AdminDashboard />
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
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/noaccess" element={<NotAccess />} />
            </Route>
        </Routes>
    );
};

export default MainRoutes;
