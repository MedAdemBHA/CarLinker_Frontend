import React, { useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useMutation, useQuery } from '@tanstack/react-query';

import {
    colors,
    fuelType,
    manufacturers,
    option,
    transmission,
} from './addFormCardUtils';
import { addCar } from '@/api/services/carServices';
import { getCarWithID, updateCarWithID } from '@/api/services/userController';
import { Dropdown } from '@/components/commons/dropdown/dopdown';
import { CheckboxGroup } from '@/components/commons/dropdown/dropdownMulti';
import { Input } from '@/components/commons/input/input';
import { useAuth } from '@/context/authContext/authContext';

import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { z } from 'zod';

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];

type Item = {
    manufacturer?: string;
    model?: string;
    mileage?: string;
    location?: string;
    year?: string;
    price?: number;
    color?: string;
    fuelType?: string;
    option?: string[];
    transmission?: string;
    description?: string;
    images?: FileList | undefined;
};
const carPostSchema = z.object({
    manufacturer: z.string().min(1, 'Please select a manufacturer.'),
    model: z
        .string()
        .min(1, 'Please select a model.')
        .max(50, 'Model name cannot exceed 50 characters.')
        .regex(/^[a-zA-Z0-9\s\-]+$/, 'Invalid model name format.'),

    mileage: z
        .string()
        .min(0, 'Mileage cannot be negative.')
        .max(6, 'Mileage cannot exceed 999,999.')
        .regex(/^\d+$/, 'Mileage must be a valid number.'),
    location: z
        .string()
        .min(1, 'Please pick a location.')
        .max(255, 'Location cannot exceed 255 characters.')
        .regex(
            /^[\w\s,-]+(?:, [\w\s,-]+)?$/,
            'Invalid location format. Example: "Sousse, Tunisie".',
        ),

    year: z
        .string()
        .min(4, 'Please select a year.')
        .regex(
            /^(19\d{2}|20(?:[012]\d|3[01]))$/,
            'Year must be between 1900 and 2024.',
        ),

    price: z
        .string()
        .min(0, 'Minimum price is 1,000 DT.')
        .max(9, 'Maximum price is 200,000 DT.'),
    color: z.string().min(1, 'Please pick a color.'),

    fuelType: z.string().min(1, 'Please select a fuel type.'),

    option: z.any(),

    transmission: z.string().min(1, 'Please select your transmission type.'),
    description: z
        .string()
        .min(1, 'Description must be at least 1 character long.')
        .max(1000, 'Description cannot exceed 1000 characters.'),
    images: z
        .any()
        .refine(
            (files) => files && files.length < 3,
            'Please select MAX 3 image.',
        )

        .refine((files) => {
            return files?.[0]?.size <= MAX_FILE_SIZE;
        }, `Maximum image size is 5MB.`)
        .refine(
            (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
            'Only .jpg, .jpeg, .png, and .webp formats are supported.',
        ), // Allows any type
});

const CarForm: React.FC = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const { pathname } = useLocation();
    const [selectedImage, setSelectedImage] = useState<FileList | null>(null);

    const { id } = useParams<{ id?: string }>();
    const token = auth.token || '';
    const methods = useForm<Item>({
        resolver: zodResolver(carPostSchema),
        defaultValues: {
            manufacturer: '',
            model: '',
            mileage: '',
            location: '',
            year: '',
            price: 0,
            color: '',
            fuelType: '',
            option: [],
            transmission: '',
            description: '',
            images: undefined,
        },
    });
    const addMyCar = useMutation(addCar);
    const updateMyCar = useMutation(updateCarWithID);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = methods;
    const mode = pathname.includes('new') ? 'new' : 'udapte';

    const getCarByID = useQuery(
        ['carMYData', id],
        () => getCarWithID(auth.token || '', id || ''),
        {
            enabled: !!id,

            onSuccess: (data) => {
                console.log(data);
                reset({
                    color: data?.color || '',
                    description: data?.description || '',
                    fuelType: data?.fuelType || '',
                    location: data?.location || '',
                    manufacturer: data?.manufacturer || '',
                    mileage: data?.mileage || '',
                    model: data?.model || '',
                    year: data?.year || '',
                    price: data?.price || '',
                    transmission: data?.transmission || '',
                    option: data?.option || [],
                });
            },
        },
    );

    const onSubmit = async (data: Item) => {
        if (mode === 'new') {
            try {
                await addMyCar.mutateAsync(
                    { token: token, carData: data },
                    {
                        onSuccess: () => {
                            navigate('/myprofile');
                            toast.success('Car added successfully ', {
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
                        },
                        onError: () => {
                            toast.error('failed add Car.', {
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
                    },
                );
            } catch (error) {
                console.error('An error occurred:', error);
            }
        } else {
            try {
                if (!id) {
                    throw new Error('Car ID is undefined.');
                }
                await updateMyCar.mutateAsync(
                    { token: token, carData: data, id: id },
                    {
                        onSuccess: () => {
                            navigate('/myprofile');
                            toast.success('Car added successfully ', {
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
                        },
                        onError: () => {
                            toast.error('failed add Car.', {
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
                    },
                );
            } catch (error) {
                console.error('An error occurred:', error);
            }
        }
    };

    return (
        <div className="max-w-6xl p-6 mx-auto bg-blue-600 rounded-md shadow-md  mt-3 mb-3 pt-10 px-2 md:px-5 pb-4">
            <h1 className="text-xl font-bold text-white capitalize dark:text-white">
                {mode === 'new'
                    ? 'Add your car details'
                    : 'update your car details'}
            </h1>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
                        <Dropdown
                            label="Manufacturer"
                            name="manufacturer"
                            options={manufacturers}
                            register={register}
                            errors={errors}
                        />

                        <Input
                            name="model"
                            label="Model"
                            type="name"
                            icon="fa-solid fa-key"
                            placeholder="Model"
                        />

                        <Input
                            name="mileage"
                            label="Mileage"
                            type="number"
                            icon="fa-solid fa-key"
                            placeholder="Mileage"
                        />

                        <Input
                            name="price"
                            label="Price"
                            type="number"
                            icon="fa-solid fa-key"
                            placeholder="Price"
                        />

                        <Input
                            name="location"
                            label="Location"
                            type="text"
                            icon="fa-solid fa-key"
                            placeholder="Location"
                        />

                        <Input
                            name="year"
                            label="Year"
                            type="number"
                            icon="fa-solid fa-key"
                            placeholder="Year"
                        />

                        <Dropdown
                            label="Color"
                            name="color"
                            options={colors}
                            register={register}
                            errors={errors}
                        />
                        <Dropdown
                            label="Fuel Type"
                            name="fuelType"
                            options={fuelType}
                            register={register}
                            errors={errors}
                        />

                        <CheckboxGroup
                            label="Options"
                            name="option"
                            options={option}
                            register={register}
                            errors={errors}
                        />
                        <Dropdown
                            label="Transmission"
                            name="transmission"
                            options={transmission}
                            register={register}
                            errors={errors}
                        />

                        <div>
                            <label
                                className="text-white dark:text-gray-200"
                                htmlFor="textarea"
                            >
                                Description
                            </label>
                            <textarea
                                {...methods.register('description')}
                                id="textarea"
                                className="block w-full h-[136px] px-4 py-2 mt-2 text-gray-700 bg-white border  border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            ></textarea>
                            {errors.description && (
                                <div className="text-sm italic text-red-500">
                                    {errors.description.message}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white">
                                Image
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <svg
                                        className="mx-auto h-12 w-12 text-white"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className=""
                                        >
                                            <input
                                                id="file-upload"
                                                type="file"
                                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                                multiple
                                                {...methods.register(
                                                    'images',
                                                    {},
                                                )}
                                            />
                                        </label>
                                    </div>
                                    <p className="text-xs text-white">
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                                    {errors.images && (
                                        <div className="text-sm italic text-red-500">
                                            {errors.images.message}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
                        >
                            Save
                        </button>
                        <p></p>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default CarForm;
