import React from 'react';

import TableHeader from './tableHeader';
import TableRow from './TableRow';

interface TableProps {
    headings: string[];
    data: User[];
    onDelete: (id: number) => void;
}

const Table: React.FC<TableProps> = ({ headings, data, onDelete }) => (
    <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full">
                <TableHeader headings={headings} />
                <tbody className="bg-white">
                    {data
                        .filter((user) => user.userRole === 'USER')
                        .map((user, index) => (
                            <TableRow
                                key={index}
                                user={user}
                                onDelete={onDelete}
                            />
                        ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default Table;
