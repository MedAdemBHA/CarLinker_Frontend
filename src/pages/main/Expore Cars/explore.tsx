import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getAllActiveCars } from '@/api/services/carServices';
import { CarCard } from '@/components/ui/cards/carCard';
import Filter from '@/components/ui/headers/filter';

import toast from 'react-hot-toast';

function About() {
    const [carDataArray, setCarDataArray] = useState([]);
    // const carDataArray = [
    //     {
    //         id: 12,
    //         manufacturer: 'VW',
    //         model: 'Golf5',
    //         mileage: '300 000',
    //         color: 'Pink',
    //         fuelType: 'Petrol',
    //         price: 25000,
    //         year: '2020',
    //         status: true,
    //         option: ['BLUETOOTH', 'GPS', 'ALARM', 'AIRBAG'],
    //         transmission: 'MANUAL',
    //         description: 'Well-maintained car',
    //         location: 'New York',
    //         images: null,
    //         imageFiles: ['/images/1712683541910_maruti_suzuki_xl6.jpg'],
    //         userID: 81,
    //         name: 'mohsen@mohsen.com',
    //         phone: '+216 52 067 544',
    //         lastLoginDate: '2024-04-12T12:16:11',
    //     },
    // ];

    const Allusers = useQuery(['AllActiveCars'], () => getAllActiveCars(), {
        onSuccess: (data) => {
            setCarDataArray(data);
        },

        onError: (error: Error) => {
            toast.error('Failed to add Car: ' + error.message, {
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

    return (
        <div className="content ml-12 transform ease-in-out duration-500  px-2 md:px-5 pb-4">
            <div className="relative  z-[4] h-[100px] w-[100vw]">
                <h1 className="absolute z-[5] top-0 flex flex-col max-lg:text-center justify-center px-[67px] text-black font-[700] text-[38px]  h-full w-full">
                    Discover
                    <span className="font-[400] text-[16px]">
                        Home/Discover
                    </span>
                </h1>
            </div>
            {/* <Filter /> */}

            <div className="flex flex-wrap justify-center gap-9 mt-3 pb-4">
                {carDataArray.map((carData, index) => (
                    <div
                        key={index}
                        className="w-xs sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-1 mb-4"
                    >
                        <CarCard data={carData} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default About;
