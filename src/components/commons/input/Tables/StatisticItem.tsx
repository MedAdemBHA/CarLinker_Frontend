import React from 'react';

interface StatisticItemProps {
    statistic: Statistic;
}

const StatisticItem: React.FC<StatisticItemProps> = ({ statistic }) => (
    <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
        <div className="flex items-center px-5 py-6 bg-blue-100 rounded-md shadow-sm">
            <div className="mx-5">
                <h4 className="text-2xl font-semibold text-gray-700">
                    {statistic.count}
                </h4>
                <div className="text-gray-500">{statistic.label}</div>
            </div>
        </div>
    </div>
);

export default StatisticItem;
