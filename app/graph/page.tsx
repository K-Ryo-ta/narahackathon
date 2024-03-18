// page.tsx
'use client'
import Graph from '@/components/Graph';
import Table from '@/components/Table';
import { getAnswerData } from '@/lib/firebase';
import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

const page = () => {
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
        <div className='flex w-full'>
            {data && <Table aggregatedData={data} />}
            <div className='w-[17%]'>
            {
                data?.map((index:DocumentData)=>(
                    index && <Graph aggregatedData={index} />
                ))
            }
            </div>
            
        </div>
    );
};

export default page;
