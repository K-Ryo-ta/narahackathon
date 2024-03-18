'use client'
import SurveyForm from "@/components/SurveyForm";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import { MouseEvent, useEffect, useState } from 'react';
import { useContext } from 'react';
import StateContext from "../stateManegement";
import { aggregateStats, saveResponse } from "@/lib/firebase";

const FinishPage = () => {
    const router = useRouter();
    const stateInfo = useContext(StateContext);
    const [docId, setDocId] = useState<string | null>(null);

    useEffect(() => {
        if (docId) {
            console.log(docId);
            aggregateStats(docId);
        }
    }, [docId]);

    const handleAdvice = async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        event.preventDefault();

        for (let i = 1; i < 6; i++) {
            const questionKey = `q${i}`;
            const answer = stateInfo[questionKey];
            console.log(answer);

            if (answer) {
                const docID = await saveResponse(questionKey, answer);
                console.log(docID);
                if (docID) {
                    stateInfo[`docRefID${i}`] = docID;
                    setDocId(docID);
                }
            }
        }

        router.push('/advice');
        alert('アンケートにご協力いただきありがとうございます。');
    }

    return (
        <div className="max-w-[340px] mx-auto rounded-2xl w-[90vw] bg-gray-100 mt-5 ">
            <br />
            <br />
            <br />
            <br />
            <h1 className="font-extrabold text-center">
                ご協力ありがとうございました！
            </h1>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="flex justify-center">
                <Button
                    colorScheme='green'
                    onClick={handleAdvice}
                    whiteSpace="normal"
                    textAlign="center"
                    height="auto"
                    py={2}
                >
                    暮らしのアドバイス又は<br />
                    クーポンを受け取る
                </Button>
            </div>
            <br />
        </div>
    )
}

export default FinishPage;
