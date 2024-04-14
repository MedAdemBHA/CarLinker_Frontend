import React from 'react';

interface Option {
    value: string;
    label: string;
}

interface Props {
    label: string;
    name: string;
    options: Option[];
    register: any;
    errors: any;
}

export const Dropdown: React.FC<Props> = ({
    label,
    name,
    options,
    register,
    errors,
}) => {
    return (
        <div>
            <label className="text-white dark:text-gray-200">{label}</label>
            <select
                {...register(name)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            >
                {options.map(
                    (
                        option: Option, // Explicitly specify the type of option
                    ) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ),
                )}
            </select>
            {errors[name] && (
                <div className="text-sm italic text-red-500">
                    {errors[name].message}
                </div>
            )}
        </div>
    );
};
