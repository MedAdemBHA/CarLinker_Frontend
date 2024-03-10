import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './App.tsx';
import './index.css';

import ReactDOM from 'react-dom/client';

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>,
);
