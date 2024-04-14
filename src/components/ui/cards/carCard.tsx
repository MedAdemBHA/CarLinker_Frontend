import { useState } from 'react';

import { Link } from 'react-router-dom';

import { baseUrl } from '@/apiConfig';
import airbagImage from '@/assets/carIcon/AIRBAG.png';
import alarmImage from '@/assets/carIcon/ALARM.png';
import automaticTransmissionImage from '@/assets/carIcon/AUTOMATIC.png';
import bluetoothImage from '@/assets/carIcon/BLUETOOTH.png';
import gpsImage from '@/assets/carIcon/GPS.png';
import manualTransmissionImage from '@/assets/carIcon/MANUAL.png';

import PropTypes from 'prop-types';

interface OriginalData {
    id: number;
    manufacturer: string;
    model: string;
    mileage: string;
    color: string;
    fuelType: string;
    price: number;
    year: string;
    status: boolean;
    option: string[];
    transmission: string;
    description: string;
    location: string;
    images: null | any[]; // Depending on the actual structure of images
    imageFiles: string[];
    userID: number;
    name: string;
    phone: string;
    lastLoginDate: string;
}
export const CarCard = ({ data }: { data: OriginalData }) => {
    const {
        color,
        year,
        manufacturer,
        model,
        imageFiles,
        price,
        mileage,
        name,
        phone,
        lastLoginDate,
        transmission,
        option,
    } = data;
    const optionImages: { [key: string]: string } = {
        BLUETOOTH: bluetoothImage,
        GPS: gpsImage,
        AIRBAG: airbagImage,
        ALARM: alarmImage,
    };

    const formatNumberWithSpaceSeparator = (number: number | string) => {
        const formattedNumber = parseInt(number as string, 10).toLocaleString();
        return formattedNumber.replace(/,/g, ' ');
    };

    const formattedPrice = formatNumberWithSpaceSeparator(price);

    const transmissionImage =
        transmission === 'MANUAL'
            ? manualTransmissionImage
            : automaticTransmissionImage;
    const formattedLastLoginDate = new Date(lastLoginDate)
        .toISOString()
        .split('T')[0]
        .replace(/-/g, '/');
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-xl flex flex-col h-full">
            <img
                className="object-cover max-h-[150px]"
                src={`${baseUrl}${imageFiles[0]}`}
                alt={`${manufacturer} ${model}`}
            />

            <div className="px-4 pt-1  flex-grow">
                <div className="mb-2">
                    <h2 className="text-xl font-bold text-gray-900">{`${manufacturer} ${model}`}</h2>
                    <div className="flex items-center">
                        <div className="mr-2 rounded-full bg-blue-600 py-1 px-3 text-xs font-medium text-white">
                            {year}
                        </div>
                        <div className="mr-2 rounded-full bg-slate-500 py-1 px-2 text-xs font-medium text-white">
                            {mileage} KM
                        </div>
                        <div
                            style={{ backgroundColor: color }}
                            className={
                                'rounded-full bg-yellow-400 py-1 px-2 text-xs font-medium text-white'
                            }
                        >
                            {color}
                        </div>
                    </div>
                </div>
                <div className="flex justify-around">
                    <div className="flex items-center">
                        <img
                            src={transmissionImage}
                            className="w-12"
                            alt="transmissionImage"
                        />
                    </div>
                    <div className="flex items-center">
                        {option.map((opt) => (
                            <img
                                key={opt}
                                src={optionImages[opt]}
                                className="w-10"
                                alt={opt}
                            />
                        ))}
                    </div>{' '}
                </div>
                <div className="flex items-center justify-center mt-1">
                    <div className=" text-blue-800 rounded-lg p-2 shadow-lg">
                        <p className="text-3xl font-extrabold">
                            {formattedPrice} DT
                        </p>
                    </div>
                </div>
            </div>
            <div className="px-6 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <div>
                        <p className="text-xs font-medium text-gray-800">
                            {name}
                        </p>
                        <p className="text-xs text-gray-600">
                            {formattedLastLoginDate}
                        </p>
                    </div>
                </div>
                <div className="flex w-full bg-white justify-end   items-center">
                    <Link
                        to={`tel:${phone}`}
                        className="mr-2 rounded-full bg-gray-300 p-1 text-gray-700 hover:text-gray-800"
                    >
                        <img
                            className=" w-4"
                            src="https://img.icons8.com/color/24/null/ringer-volume.png"
                            alt="Phone Icon"
                        />
                    </Link>
                    <Link
                        to={`https://wa.me/${phone}`}
                        className="rounded-full bg-green-500 p-1 text-white hover:bg-green-600"
                    >
                        <img
                            className="w-4"
                            src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/24/null/external-WhatsApp-social-media-those-icons-lineal-color-those-icons.png"
                            alt="WhatsApp Icon"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

CarCard.propTypes = {
    data: PropTypes.shape({
        year: PropTypes.number.isRequired,
        make: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        rentalPrice: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    onToggleLike: PropTypes.func,
};
