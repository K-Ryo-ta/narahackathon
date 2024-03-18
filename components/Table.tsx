// Table.tsx
import { DocumentData } from 'firebase/firestore';
import React from 'react';

const Table = ({ aggregatedData }: { aggregatedData: DocumentData[] }) => {
    const renderTableRows = (index: number) => {
        if (aggregatedData[index]) {
            const data = aggregatedData[index];
            const total = data.total;
            const entries = Object.entries(data).filter(([key]) => key !== 'total');

            return (
                <>
                    {entries.map(([key, value]) => (
                        <tr key={key} className="border-b">
                            <td className="px-4 py-2">{key}</td>
                            <td className="px-4 py-2">{value}</td>
                        </tr>
                    ))}
                    <tr className="bg-gray-100 font-bold">
                        <td className="px-4 py-2">Total</td>
                        <td className="px-4 py-2">{total}</td>
                    </tr>
                </>
            );
        }
        return null;
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4">アンケート結果</h2>
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-200 text-gray-700">
                        <th className="px-4 py-2">選択肢</th>
                        <th className="px-4 py-2">回答数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={2} className="px-4 py-2 bg-gray-100 font-bold">問1</td>
                    </tr>
                    {renderTableRows(0)}
                    <tr>
                        <td colSpan={2} className="px-4 py-2 bg-gray-100 font-bold">問2</td>
                    </tr>
                    {renderTableRows(1)}
                    <tr>
                        <td colSpan={2} className="px-4 py-2 bg-gray-100 font-bold">問3</td>
                    </tr>
                    {renderTableRows(2)}
                    <tr>
                        <td colSpan={2} className="px-4 py-2 bg-gray-100 font-bold">問4</td>
                    </tr>
                    {renderTableRows(3)}
                    <tr>
                        <td colSpan={2} className="px-4 py-2 bg-gray-100 font-bold">問5</td>
                    </tr>
                    {renderTableRows(4)}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
