'use client'
import Graph from '@/components/Graph';
import Table from '@/components/Table';
import { getAnswerData } from '@/lib/firebase';
import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [data, setData] = useState<DocumentData[] | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const answersData = await getAnswerData();
                setData(answersData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='flex w-full justify-center items-center'>
            <div className=''>
                {data?.map((value: DocumentData, index: number) => (
                    <div className='flex w-full' key={index}>
                        <div className=''>
                            <Table aggregatedData={value} questionKey={`${index + 1}`} />
                        </div>

                        <div className=''>
                            <Graph aggregatedData={value} questionKey={`${index + 1}`} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;
