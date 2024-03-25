import { FormProvider, useForm } from 'react-hook-form';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import { loginUser } from '@/api/services/authServices';
import carFormImg from '@/assets/carForm.avif';
import log from '@/assets/Login.png';
import { Input } from '@/components/commons/input/input';
import { useAuth } from '@/context/authContext/authContext';

import { zodResolver } from '@hookform/resolvers/zod';
import toast, { Toaster } from 'react-hot-toast';
import { z } from 'zod';

interface SignInState {
    email: string;
    password: string;
}

const SignUpSchema = z.object({
    email: z.string().email('Please choose a valide Email'),
    password: z
        .string()
        .min(3, { message: 'Please choose a password' })
        .max(20, { message: 'Please choose a password' }),
});

const Signin = () => {
    const auth = useAuth();
    const from = '/';
    const mutation = useMutation(loginUser);
    const navigate = useNavigate();
    const methods = useForm<SignInState>({
        mode: 'onChange',
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const { handleSubmit } = methods;
    const onSubmit = (data: SignInState) => {
        try {
            mutation.mutate(data, {
                onSuccess: (data) => {
                    toast.success('Login successful!', {
                        style: {
                            border: '1px solid #008000', // Green border
                            padding: '16px',
                            color: '#008000', // Green text color
                        },
                        iconTheme: {
                            primary: '#008000', // Green icon color
                            secondary: '#FFFFFF', // White background for the icon
                        },
                    });
                    auth.signIn({
                        token: data.jwt,
                    });
                    navigate(from, { replace: true });
                },
                onError: (error) => {
                    console.error('Login error:', error);
                    toast.error('Login failed.', {
                        style: {
                            border: '1px solid #FF0000', // Red border
                            padding: '16px',
                            color: '#FF0000', // Red text color
                        },
                        iconTheme: {
                            primary: '#FF0000', // Red icon color
                            secondary: '#FFFFFF', // White background for the icon
                        },
                    });
                },
            });
        } catch {}
    };
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 w-[90%] md:w-[50%] lg:w-[90%] mx-auto min-h-screen">
            <div className="hidden lg:flex flex-col justify-center items-center">
                <img src={carFormImg} alt="" />
            </div>

            {/* right side login form */}
            <div className="shadow-xl p-10 flex items-center justify-center flex-col w-full">
                <img
                    src={log}
                    className="h-[100px] max-sm:h-[34px] md-lg:h-[40px]"
                    alt=""
                />
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <div className="mb-4">
                            <Input
                                name="email"
                                label="Email"
                                type="text"
                                icon="fa-solid fa-envelope"
                                placeholder="Email"
                            />
                        </div>

                        <div className="mb-4">
                            <Input
                                name="password"
                                label="Password"
                                type="password"
                                icon="fa-solid fa-key"
                                placeholder="Password"
                            />
                        </div>

                        <button
                            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            {mutation.isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </FormProvider>
                <hr className="mb-6 border-t" />
                {/* social login */}
                <p className="inline-block text-sm">
                    Don't have an account yet?{' '}
                    <Link
                        className=" text-blue-500 align-baseline hover:text-blue-800"
                        to="/auth/signup"
                    >
                        Signin
                    </Link>
                </p>
            </div>
            <Toaster position="bottom-center" />
        </div>
    );
};

export default Signin;
