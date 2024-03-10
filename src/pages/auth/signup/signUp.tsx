import { FormProvider, useForm } from 'react-hook-form';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import { registerUser } from '@/api/services/authServices';
import carFormImg from '@/assets/carForm.avif';
import reg from '@/assets/Registre.png';
import { Input } from '@/components/commons/input/input';

import { zodResolver } from '@hookform/resolvers/zod';
import toast, { Toaster } from 'react-hot-toast';
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
    const location: any = useLocation();

    const from = location.state?.from?.pathname || '/auth/signin';

    const navigate = useNavigate();
    const mutation = useMutation(registerUser);
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
        mutation.mutate(data, {
            onSuccess: (responseData) => {
                console.log('Login successful:', responseData);
                toast.success('Login successful!', {
                    style: {
                        border: '1px solid #008000',
                        padding: '16px',
                        color: '#008000',
                    },
                    iconTheme: {
                        primary: '#008000',
                        secondary: '#FFFFFF',
                    },
                });
                navigate(from, { replace: true });
            },
            onError: (error: any) => {
                console.error('Login error:', error);
                toast.error('Email is already in use.', {
                    style: {
                        border: '1px solid #FF0000',
                        padding: '16px',
                        color: '#FF0000',
                    },
                    iconTheme: {
                        primary: '#FF0000',
                        secondary: '#FFFFFF',
                    },
                });
            },
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 w-[90%] md:w-[50%] lg:w-[90%] justify-center mt-5 mx-auto h-[95%]">
            <div className="hidden lg:flex flex-col justify-center items-center">
                <img src={carFormImg} alt="" />
            </div>

            {/* right side login form */}
            <div className="shadow-xl p-10 flex items-center  flex-col w-full">
                <div className="flex ">
                    <img
                        src={reg}
                        className="h-[100px] max-sm:h-[34px] md-lg:h-[40px]"
                        alt=""
                    />
                </div>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <div className="mb-4">
                            <Input
                                name="name"
                                label="Name"
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
                            className="w-full px-4 py-2 font-bold text-white bg-[#004AAD] rounded-full hover:bg-[#004AAD] focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            {mutation.isLoading ? 'Registre ...' : 'Registre'}
                        </button>
                    </form>
                </FormProvider>
                <hr className="mb-6 border-t" />
                {/* social login */}
                <p className="inline-block text-sm">
                    Vous avez déjà un compte{' '}
                    <Link
                        className=" text-blue-500 align-baseline hover:text-blue-800"
                        to="/auth/signin"
                    >
                        Signup
                    </Link>
                </p>
            </div>
            <Toaster position="bottom-center" reverseOrder={false} />
        </div>
    );
};

export default Signup;
