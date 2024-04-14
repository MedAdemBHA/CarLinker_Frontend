import React from 'react';

import { Link } from 'react-router-dom';

interface TableRowProps {
    user: User;
    onDelete: (id: number) => void;
}
const formatDateString = (timestamp: string): string => {
    const dateObject: Date = new Date(timestamp);

    return dateObject.toISOString().split('T')[0];
};
const TableRowUser: React.FC<TableRowProps> = ({ user, onDelete }) => {
    return (
        <>
            <tr>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="flex items-center">
                        <div className="ml-4">
                            <div className="text-sm font-medium leading-5 text-gray-900">
                                {user.name}
                            </div>
                            <div className="text-sm leading-5 text-gray-500">
                                {user.email}
                            </div>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="text-sm leading-5 text-gray-500">
                        {formatDateString(user.lastLoginDate)}
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 ${
                            user.isActive
                                ? 'text-green-800 bg-green-100'
                                : 'text-red-800 bg-red-100'
                        }`}
                    >
                        {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                </td>
                <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                    {user.userRole}
                </td>
                <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 ">
                    <Link
                        className="text-green-500 hover:text-green-700"
                        to={`/dashbord/${user.id}`}
                    >
                        Edit
                    </Link>
                </td>
                <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 ">
                    <a
                        onClick={() => onDelete(user.id)}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                        Delete
                    </a>
                </td>
            </tr>
        </>
    );
};

export default TableRowUser;
