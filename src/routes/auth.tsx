import { Route, Routes } from 'react-router-dom';

import AuthLayout from '@/pages/auth/authLayout';
import Signin from '@/pages/auth/signin/signin';
import Signup from '@/pages/auth/signup/signUp';
import NotFoundPage from '@/pages/main/notFound/notFound';

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthLayout />}>
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};
export default AuthRoutes;
