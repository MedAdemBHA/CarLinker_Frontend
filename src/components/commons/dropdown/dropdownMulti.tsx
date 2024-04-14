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

export const CheckboxGroup: React.FC<Props> = ({
    label,
    name,
    options,
    register,
    errors,
}) => {
    return (
        <div>
            <label className="text-white dark:text-gray-200">{label}</label>
            <div className="flex space-x-2 bg-white rounded-lg mt-2 p-2">
                {options.map(
                    (
                        option: Option, // Explicitly specify the type of option
                    ) => (
                        <div key={option.value} className="flex items-center">
                            <input
                                type="checkbox"
                                id={option.value}
                                value={option.value}
                                {...register(name)}
                                className="mr-2"
                            />
                            <label htmlFor={option.value}>{option.label}</label>
                        </div>
                    ),
                )}
            </div>
            {errors[name] && (
                <div className="text-sm italic text-red-500">
                    {errors[name].message}
                </div>
            )}
        </div>
    );
};
