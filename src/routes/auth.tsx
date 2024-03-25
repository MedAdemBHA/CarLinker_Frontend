import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { useAuth } from '@/context/authContext/authContext';
import ForceRedirect from '@/context/ProtectionRouter/ForceRedirect';
import AuthLayout from '@/pages/auth/authLayout';
import Signin from '@/pages/auth/signin/signin';
import Signup from '@/pages/auth/signup/signUp';
import NotFoundPage from '@/pages/main/notFound/notFound';

const AuthRoutes: React.FC = () => {
    const auth = useAuth();
    const user = {
        isConnected: auth.isConnected,
    };
    return (
        <Routes>
            <Route path="/" element={<AuthLayout />}>
                <Route
                    path="/signin"
                    element={
                        <ForceRedirect user={user}>
                            <Signin />
                        </ForceRedirect>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <ForceRedirect user={user}>
                            <Signup />
                        </ForceRedirect>
                    }
                />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};

export default AuthRoutes;
