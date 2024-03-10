import { FormProvider, useForm } from 'react-hook-form';

import { Link } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import { loginUser } from '@/api/services/authServices';
import carFormImg from '@/assets/carForm.avif';
import logo from '@/assets/logo.png';
import { Input } from '@/components/commons/input/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface SignInState {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignUpSchema = z
    .object({
        name: z
            .string()
            .min(3, { message: 'Name must be at least 3 characters long.' })
            .max(7, {
                message:
                    'Name cannot exceed 7 characters. Please choose a shorter name.',
            }),

        email: z.string().email('Please choose a valid Email'),
        password: z
            .string()
            .min(3, { message: 'Please choose a password' })
            .max(20, { message: 'Please choose a password' }),
        confirmPassword: z.string().min(4),
    })
    .refine((data) => data.confirmPassword === data.password, {
        message: 'The passwords did not match',
        path: ['confirmPassword'], // specify the path to the confirmPassword field
    });

const Signup = () => {
    const mutation = useMutation(loginUser);
    const methods = useForm<SignInState>({
        mode: 'onChange',
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const { handleSubmit } = methods;

    const onSubmit = (data: SignInState) => {
        try {
            mutation.mutate(data, {
                onSuccess: (data) => {
                    console.log('Login successful:', data.jwt);
                },
                onError: (error) => {
                    console.error('Login error:', error);
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
                <div className="flex ">
                    <img
                        src={logo}
                        className="h-[51px] max-sm:h-[34px] md-lg:h-[40px]"
                        alt=""
                    />
                    <h2 className="pt-4 text-2xl text-center font-mono">
                        Login
                    </h2>
                </div>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <div className="mb-4">
                            <Input
                                name="name"
                                label="name"
                                type="name"
                                icon="fa-solid fa-key"
                                placeholder="name"
                            />
                        </div>
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
                        <div className="mb-4">
                            <Input
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                icon="fa-solid fa-key"
                                placeholder="Confirm Password"
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
                        to="/signup"
                    >
                        Signup
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
