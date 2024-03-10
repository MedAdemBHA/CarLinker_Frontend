import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoadingSpinner from './pages/LoadingSpinner';
import AuthRoutes from './routes/auth';
import MainRoutes from './routes/main';

const App: React.FC = () => {
    return (
        <div>
            <LoadingSpinner />
            <BrowserRouter>
                <Routes>
                    <Route path="/auth/*" element={<AuthRoutes />} />
                    <Route path="/*" element={<MainRoutes />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
