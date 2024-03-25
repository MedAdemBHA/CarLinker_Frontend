import React, { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

interface User2 {
    isConnected: boolean;
    userRole: string;
}

interface UserRouterProps {
    user: User2;
    children: ReactNode;
}

const UserRouter: React.FC<UserRouterProps> = ({ user, children }) => {
    console.log(user.userRole);
    if (!user.isConnected && user.userRole !== 'USER') {
        return <Navigate to="/noaccess" replace />;
    }

    return <>{children}</>;
};

export default UserRouter;
