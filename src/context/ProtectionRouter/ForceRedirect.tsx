import React, { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

interface User {
    isConnected: boolean;
}

interface ForceRedirectProps {
    user: User;
    children: ReactNode;
}

const ForceRedirect: React.FC<ForceRedirectProps> = ({ user, children }) => {
    if (user.isConnected) {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
};

export default ForceRedirect;
