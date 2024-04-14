import { useState } from 'react';
import { FC } from 'react';

import { Link, NavLink } from 'react-router-dom';

import addcartlogo from '@/assets/car-travel-plus-add-svgrepo-com (1).png';
import dashbordlogo from '@/assets/dashbord.png';
import logo from '@/assets/logo.png';
import { useAuth } from '@/context/authContext/authContext';

import { FaBars, FaTimes } from 'react-icons/fa';

const AppBar: FC = () => {
    const { signOut, user, isActive, isConnected } = useAuth();
    const [open, setOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(!isActive);

    const navs = ['Home', 'Explore', 'Contact'];

    const handleCloseAlert = () => {
        setShowAlert(false);
    };
    const isUserActive = () => {
        return user && isActive;
    };
    return (
        <>
            <nav className="sticky top-0 z-30 flex bg-white dark:bg-[#0F172A] items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                <Link to="/">
                    <img
                        src={logo}
                        className="h-[51px] max-sm:h-[34px] md-lg:h-[40px]"
                        alt=""
                    />
                </Link>
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

                    <div className="flex max-lg:flex-col max-lg:w-11/12 max-lg:mx-auto max-lg:gap-0 gap-10 items-center">
                        <div className="flex max-lg:flex-col max-lg:w-11/12 max-lg:mx-auto max-lg:gap-0 gap-10 items-center">
                            {user ? (
                                <>
                                    {
                                        <>
                                            {user.userRole === 'USER' && (
                                                <>
                                                    <Link
                                                        to="/addcar/new"
                                                        className="hover:text-accent flex justify-center max-lg:py-5 max-lg:w-full max-lg:text-center"
                                                    >
                                                        <img
                                                            src={addcartlogo}
                                                            className="h-[39px] max-sm:h-[34px] md-lg:h-[40px]"
                                                            alt=""
                                                        />
                                                    </Link>
                                                    <Link to="/myprofile">
                                                        <p>
                                                            Welcome, {user.name}
                                                        </p>
                                                    </Link>
                                                    <button onClick={signOut}>
                                                        Sign Out
                                                    </button>
                                                </>
                                            )}
                                            {user.userRole === 'ADMIN' && (
                                                <>
                                                    <p>Welcome, Admin!</p>
                                                    <Link
                                                        to="/dashbord"
                                                        className="hover:text-accent flex justify-center max-lg:py-5 max-lg:w-full max-lg:text-center"
                                                    >
                                                        <img
                                                            src={dashbordlogo}
                                                            className="h-[39px] max-sm:h-[34px] md-lg:h-[40px]"
                                                            alt=""
                                                        />
                                                    </Link>

                                                    <button onClick={signOut}>
                                                        Sign Out
                                                    </button>
                                                </>
                                            )}
                                        </>
                                    }
                                </>
                            ) : (
                                <>
                                    {/* Show guest-related content */}

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
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {open ? (
                    <FaTimes
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
            {showAlert &&
                !isUserActive() &&
                isConnected &&
                user?.userRole === 'USER' && (
                    <div className="bg-red-100 border border-red-400 text-red-700 m-2   px-4 py-3 rounded relative flex items-center justify-between">
                        <p className="mr-4">
                            Your account is not active. Please contact the admin
                            to verify your status.
                        </p>
                        <button
                            onClick={handleCloseAlert}
                            className="px-2 py-1 rounded-full bg-red-200 hover:bg-red-300 focus:outline-none focus:bg-red-300"
                        >
                            <svg
                                className="fill-current h-4 w-4 text-red-500"
                                role="button"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <title>Close</title>
                                <path d="M14.348 14.849a1 1 0 0 1-1.414 1.414l-2.829-2.828-2.829 2.828a1 1 0 0 1-1.414-1.414l2.828-2.829-2.828-2.829a1 1 0 1 1 1.414-1.414l2.829 2.828 2.829-2.828a1 1 0 1 1 1.414 1.414l-2.828 2.829 2.828 2.829z" />
                            </svg>
                        </button>
                    </div>
                )}
        </>
    );
};

export default AppBar;
