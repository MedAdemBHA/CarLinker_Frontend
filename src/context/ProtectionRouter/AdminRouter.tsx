import React, { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

import MyAsideComponent from '@/components/ui/aside/aside';

interface User2 {
    isConnected: boolean;
    userRole: string;
}

interface AdminRouterProps {
    user: User2;
    children: ReactNode;
}

const AdminRouter: React.FC<AdminRouterProps> = ({ user, children }) => {
    if (!user.isConnected) {
        return <Navigate to="/auth/signin" replace />;
    } else if (user.userRole !== 'ADMIN') {
        return <Navigate to="/noaccess" replace />;
    }

    return (
        <>
            <MyAsideComponent />
            {children}
        </>
    );
};

export default AdminRouter;
