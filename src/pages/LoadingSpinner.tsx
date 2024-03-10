import React, { useEffect, useState } from 'react';

import gif from '@/assets/e0126b2414599b976daeb00d036ed964.gif';

const LoadingSpinner: React.FC = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div
            className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-white z-50 ${
                loading ? 'block' : 'hidden'
            }`}
        >
            <div className="absolute animate-spin rounded-full h-60 w-60 border-t-4 border-b-4 border-blue-500"></div>
            <img
                src={gif}
                className="rounded-full h-50 w-60"
                alt="Loading Spinner"
            />
        </div>
    );
};

export default LoadingSpinner;
