import React, { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

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
    } else {
        if (user.userRole !== 'ADMIN') {
            return <Navigate to="/noaccess" replace />;
        }
    }
    return <>{children}</>;
};

export default AdminRouter;
