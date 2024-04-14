import React from 'react';

import TableHeader from './tableHeader';
import TableRowCar from './TableRowCar';

interface TableProps {
    headings: string[];
    data: Car[];
    onDelete: (id: number) => void;
}

const TableCar: React.FC<TableProps> = ({ headings, data, onDelete }) => (
    <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full">
                <TableHeader headings={headings} />
                <tbody className="bg-white">
                    {data.map((user, index) => (
                        <TableRowCar
                            key={index}
                            car={user}
                            onDelete={onDelete}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default TableCar;
