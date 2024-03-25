import React from 'react';

const Skeleton: React.FC = () => {
    return (
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="container px-6 py-8 mx-auto">
                <h3 className="text-3xl font-medium text-gray-700">
                    Dashboard
                </h3>

                {/* Skeleton for statistics */}
                <div className="mt-4">
                    <div className="flex flex-wrap -mx-6">
                        <div className="w-full px-6 sm:w-1/2 xl:w-1/3 animate-pulse">
                            <div className="flex items-center px-5 py-6 bg-blue-200 bg-opacity-40 rounded-md shadow-sm">
                                <div className="mx-5">
                                    <h4 className="text-2xl font-semibold text-gray-700">
                                        &nbsp;
                                    </h4>
                                    <div className="text-gray-500">&nbsp;</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-6 sm:w-1/2 xl:w-1/3 animate-pulse">
                            <div className="flex items-center px-5 py-6 bg-blue-200 bg-opacity-40 rounded-md shadow-sm">
                                <div className="mx-5">
                                    <h4 className="text-2xl font-semibold text-gray-700">
                                        &nbsp;
                                    </h4>
                                    <div className="text-gray-500">&nbsp;</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-6 sm:w-1/2 xl:w-1/3 animate-pulse">
                            <div className="flex items-center px-5 py-6 bg-blue-200 bg-opacity-40 rounded-md shadow-sm">
                                <div className="mx-5">
                                    <h4 className="text-2xl font-semibold text-gray-700">
                                        &nbsp;
                                    </h4>
                                    <div className="text-gray-500">&nbsp;</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Skeleton for users table */}
                <div className="flex flex-col mt-8">
                    <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                            &nbsp;
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                            &nbsp;
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                            &nbsp;
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                            &nbsp;
                                        </th>
                                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {/* Skeleton rows */}
                                    {[...Array(5)].map((_, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div className="flex items-center">
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium leading-5 text-gray-900">
                                                            &nbsp;
                                                        </div>
                                                        <div className="text-sm leading-5 text-gray-500">
                                                            &nbsp;
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div className="text-sm leading-5 text-gray-900">
                                                    &nbsp;
                                                </div>
                                                <div className="text-sm leading-5 text-gray-500">
                                                    &nbsp;
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                {/* Display user status */}
                                                <span className="inline-block h-3 w-12 bg-blue-300 bg-opacity-40 rounded-md">
                                                    &nbsp;
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                &nbsp;
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                &nbsp;
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Skeleton;
