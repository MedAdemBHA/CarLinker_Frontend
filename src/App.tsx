import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/authContext/authContext';
import LoadingSpinner from './pages/LoadingSpinner';
import AuthRoutes from './routes/auth';
import MainRoutes from './routes/main';

import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
    // Function to display error toast

    return (
        <div>
            <LoadingSpinner />
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/auth/*" element={<AuthRoutes />} />
                        <Route path="/*" element={<MainRoutes />} />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
            <Toaster position="bottom-center" />
        </div>
    );
};

export default App;
