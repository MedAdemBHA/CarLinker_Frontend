import React from 'react';

interface TableHeaderProps {
    headings: string[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ headings }) => (
    <thead>
        <tr>
            {headings.map((heading, index) => (
                <th
                    key={index}
                    className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                    {heading}
                </th>
            ))}
        </tr>
    </thead>
);

export default TableHeader;
