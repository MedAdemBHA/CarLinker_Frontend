import { createContext, FC, useContext, useEffect, useState } from 'react';

import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { RequireAuthProps } from './authContext.types';

import jwtDecode from 'jwt-decode';

type SignInProps = {
    token: string;
};
type AuthProviderProps = {
    children: React.ReactNode;
};
type AuthContextType = {
    signIn: (params: SignInProps) => Promise<void>;
    signOut: () => void;
    token: string | null;
    user: user | null;
    isConnected: boolean;
};

type user = {
    userRole: string;
    name: string;
    userId: number;
};

const AuthContext = createContext<AuthContextType>(null!);

const AuthProvider: FC<AuthProviderProps> = (props) => {
    const { children } = props;
    const navigate = useNavigate();

    const [token, setToken] = useState<string | null>(
        () => localStorage.getItem('token') || null,
    );
    const [user, setUser] = useState<user | null>(null);

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token) as user;
            setUser(decoded);
        }
    }, [token]);

    const signOut = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        navigate('/', { replace: true });
    };

    const signIn = async (params: SignInProps) => {
        const { token } = params;

        localStorage.setItem('token', token);
        setToken(token);
    };
    const isConnected = !!token;
    return (
        <AuthContext.Provider
            value={{ signOut, token, signIn, user, isConnected }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

const RequireAuth: FC<RequireAuthProps> = (props) => {
    const { children } = props;
    const auth = useAuth();
    const location = useLocation();
    if (!auth.token) {
        return (
            <Navigate to="/auth/signin" state={{ from: location }} replace />
        );
    }

    return children;
};
export { AuthProvider, useAuth, RequireAuth };
