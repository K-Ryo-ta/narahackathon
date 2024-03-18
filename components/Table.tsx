// Table.tsx
import { DocumentData } from 'firebase/firestore';
import React from 'react';

const Table = ({ aggregatedData, questionKey }: { aggregatedData: DocumentData; questionKey: string }) => {
    const renderTableRows = () => {
        if (aggregatedData) {
            const data = aggregatedData;
            const total = data.total;
            const entries = Object.entries(data).filter(([key]) => key !== 'total');
            let percentage: number = 0;
            // aggregatedDataをオブジェクトに変換
            const convertedData: { [key: string]: number } = {};
            Object.entries(aggregatedData).forEach(([key, value]) => {
                if (key !== 'total') {
                    convertedData[key] = value as number;
                }
            });

            return (
                <>
                    {entries.map(([key, value]) => (
                        percentage = (value / total) * 100,
                        <tr key={key} className="border-b">
                            <td className="px-4 py-2">{key}</td>
                            <td className="px-4 py-2">{value}</td>
                            <td className="px-4 py-2">{percentage.toFixed(1)}%</td>
                        </tr>
                    ))}
                    <tr className="bg-gray-100 font-bold">
                        <td className="px-4 py-2">Total</td>
                        <td className="px-4 py-2">{total}</td>
                        <td className="px-4 py-2">100%</td>
                    </tr>
                    <br />
                    <br />
                </>
            );
        }
        return null;
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-4">アンケート結果</h2>
            <table className="w-full bg-white rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-200 text-gray-700">
                        <th className="px-4 py-2">選択肢</th>
                        <th className="px-4 py-2">回答数</th>
                        <th className="px-4 py-2">割合</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={2} className="px-4 py-2 bg-gray-100 font-bold">問{questionKey}</td>
                    </tr>
                    {renderTableRows()}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
