import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: FC = () => {
    return (
        <div className="">
            <Outlet />
        </div>
    );
};
export default AuthLayout;
