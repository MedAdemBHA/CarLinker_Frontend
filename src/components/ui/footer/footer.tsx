import React from 'react';

import logo from '@/assets/logo.png';

function Footer() {
    return (
        <div className="text-center">
            <hr />
            <a
                href="#"
                className="flex items-center justify-center mb-5 mt-5 text-2xl font-semibold text-gray-900 dark:text-white"
            >
                <img
                    src={logo}
                    className="h-12 mr-3 sm:h-9"
                    alt="Landwind Logo"
                />
                Car Linker
            </a>

            <span className="block text-sm text-center text-gray-500 dark:text-gray-400">
                © 2024-2025 CarLinker. All Rights Reserved. Built with .
            </span>

            <ul className="flex justify-center mt-5 space-x-5">
                <li>
                    <a
                        href="#"
                        className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400"
                    ></a>
                </li>
                {/* Add other list items similarly */}
            </ul>
        </div>
    );
}

export default Footer;
