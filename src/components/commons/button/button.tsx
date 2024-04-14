import React from 'react';

import icons from '@/icons.svg';

import PropTypes from 'prop-types';

interface ButtonProps {
    label: string;
    iconURL?: string;
    ariaLabel?: string;
    className?: string;
    svgClass?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset' | undefined;
    id?: string | number;
}

const Button: React.FC<ButtonProps> = ({
    label,
    iconURL,
    ariaLabel,
    className,
    svgClass,
    onClick,
    type = 'button',
    id,
}) => {
    return (
        <button
            data-id={id}
            type={type}
            className={
                className
                    ? `${className}`
                    : 'flex h-[28px] w-[28px] items-center justify-center rounded-full border-none outline-none transition duration-200 ease-in-out active:shadow-sm'
            }
            onClick={onClick}
        >
            {label}

            {iconURL && (
                <svg
                    width="18"
                    height="18"
                    aria-label={ariaLabel}
                    className={svgClass}
                >
                    <use href={icons + iconURL} />
                </svg>
            )}
        </button>
    );
};

Button.propTypes = {
    label: PropTypes.string.isRequired,
    iconURL: PropTypes.string,
    ariaLabel: PropTypes.string,
    className: PropTypes.string,
    svgClass: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Button;
