import { FC } from 'react';

import { Outlet } from 'react-router-dom';

import AppBar from '@/components/ui/headers/appBar/appBar';

const MainLayout: FC = () => {
    return (
        <div className="font-rubik relative bg-background">
            <AppBar />
            <Outlet />
        </div>
    );
};
export default MainLayout;
