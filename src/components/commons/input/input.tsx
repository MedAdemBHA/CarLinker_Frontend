import React from 'react';

import {
    FieldPath,
    FieldValues,
    useController,
    useFormContext,
} from 'react-hook-form';

type InputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    disableError?: boolean;
    name: TName;
    placeholder: string;
    label: string;
    type?: React.HTMLInputTypeAttribute;
    icon?: React.ReactNode;
    helperText?: string | null;
};

const Input: React.FC<InputProps> = ({
    name,
    type,
    label,
    disableError,
    placeholder,
}) => {
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useFormContext(); // Add this line
    const { field, fieldState } = useController({
        name,
        control,
    });
    return (
        <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
                {label}
            </label>
            <div className="input-group">
                <span className="input-group-text"></span>
                <input
                    {...field}
                    type={type}
                    placeholder={placeholder}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darke"
                />
                <div className="text-sm italic text-red-500">
                    {!disableError && fieldState.error?.message}
                </div>
            </div>
        </div>
    );
};

Input.displayName = 'Input';
export { Input };
