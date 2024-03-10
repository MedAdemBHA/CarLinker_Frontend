import { useState } from 'react';
import { FC } from 'react';

import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

import addcartlogo from '@/assets/car-travel-plus-add-svgrepo-com (1).png';
import logo from '@/assets/logo.png';

import { FaBars, FaXmark } from 'react-icons/fa6';

const AppBar: FC = () => {
    const [open, setOpen] = useState(false);

    const navs = ['Home', 'About', 'Contact'];
    return (
        <nav className=" w-max-full justify-between gap-4 z-10  px-[67px] max-sm:px-[30px] flex items-center relative z-3">
            <img
                src={logo}
                className="h-[51px] max-sm:h-[34px] md-lg:h-[40px]"
                alt=""
            />

            <div
                className={`max-lg:flex-col max-lg:top-[100px] max-lg:bg-white max-lg:shadow-lg ${
                    open ? 'max-lg:left-[0px]' : 'max-lg:left-[-100vw]'
                } max-lg:pb-7 max-lg:absolute max-lg:z-[-1] transition-left duration-[700ms] ease-in flex w-full`}
            >
                <ul className="flex font-[500]  max-lg:text-center w-7/12 gap-6 mx-auto max-lg:mx-auto max-lg:flex-col max-sm:w-11/12">
                    {navs.map((nav) => (
                        <NavLink
                            key={nav}
                            onClick={() => setOpen(false)}
                            to={nav === 'Home' ? '' : `/${nav}`}
                            style={({ isActive }) =>
                                isActive ? { color: '#004AAD' } : {}
                            }
                            className="cursor-pointer delay-[200ms] transition-colors ease hover:text-accent py-5"
                        >
                            {nav}
                        </NavLink>
                    ))}
                </ul>

                <div className="flex max-lg:flex-col  max-lg:w-11/12 max-lg:mx-auto max-lg:gap-0 gap-10 items-center">
                    <div className="flex max-lg:flex-col max-lg:w-11/12 max-lg:mx-auto max-lg:gap-0 gap-10 items-center">
                        <Link
                            to="/auth/signin"
                            className="hover:text-accent  flex justify-center  max-lg:py-5 max-lg:w-full max-lg:text-center"
                        >
                            <img
                                src={addcartlogo}
                                className="h-[39px] max-sm:h-[34px] md-lg:h-[40px]"
                                alt=""
                            />
                        </Link>
                        <Link
                            to="/auth/signin"
                            className="hover:text-accent max-lg:py-5 max-lg:w-full max-lg:text-center"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/auth/signUp"
                            className="bg-[#004AAD] text-white max-lg:w-5/12 px-[20px] py-[5px] rounded-md max-lg:py-1 max-lg:text-center"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </div>

            {open ? (
                <FaXmark
                    onClick={() => {
                        setOpen(!open);
                    }}
                    className="lg:hidden cursor-pointer text-[27px]"
                />
            ) : (
                <FaBars
                    onClick={() => {
                        setOpen(!open);
                    }}
                    className="lg:hidden cursor-pointer text-[27px]"
                />
            )}
        </nav>
    );
};

export default AppBar;
