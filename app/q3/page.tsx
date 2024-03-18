'use client'
import SurveyForm from "@/components/SurveyForm";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import { MouseEvent, } from 'react';
import { Progress } from '@chakra-ui/react'
import { useState, useEffect, useContext } from 'react';
import { aggregateStats, getData, saveResponse } from "@/lib/firebase";
import { isSupported } from "firebase/analytics";
import { getAnalytics } from "firebase/analytics";
import { DocumentData } from "firebase/firestore";
import StateContext from "../stateManegement";


const Page3 = () => {
    const router = useRouter();
    const [answer, setAnswer] = useState<string | null>(null);
    const [data, setData] = useState<DocumentData | null>(null);
    const [docId, setDocId] = useState<string | null>(null);
    const stateInfo = useContext(StateContext);
    const [progress, setProgress] = useState<number>(40);

    useEffect(() => {
        if (docId) {
            aggregateStats(docId);
        }
    }, [docId]);

    const NextRouteHandleClick = async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        event.preventDefault();
        if (answer) {
            const docRefId = await saveResponse("q3", answer);
            console.log(docRefId);
            if (docRefId) {
                setDocId(docRefId);
            }
            // 回答が選択されている場合は次のページに遷移
            router.push('/q4');
        } else {
            // 回答が選択されていない場合はアラートを表示
            alert('回答を選択してください。');
        }
    }

    const BackRouteHandleClick = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        event.preventDefault();
        router.push('/q2');
    }

    const handleAnswer = (selectedAnswer: string) => {
        setAnswer(selectedAnswer);
        stateInfo.q3 = selectedAnswer;
        setProgress(60);
    }

    const handleOtherAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value);
    }
    console.log(answer);

    useEffect(() => {
        const initializeAnalytics = async () => {
            if (typeof window !== 'undefined') {
                if (await isSupported()) {
                    const analytics = getAnalytics();
                    // Analyticsの設定や使用
                } else {
                    console.log('Firebase Analytics is not supported in this environment.');
                }
            }
        };

        initializeAnalytics();

        const fetchData = async () => {
            try {
                const data = await getData("q3");
                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])

    return (
        <div className="max-w-[340px] mx-auto rounded-2xl w-[90vw] bg-gray-100 mt-5 ">
            <br />
            <br />
            <div className="flex justify-center shadow-2xl">
                <div className="w-[70%] shadow-md">
                    <Progress value={progress} colorScheme='green' size='lg' />
                </div>
                <p className="font-bold text-xs">
                    {progress}
                </p>
            </div>


            <br />
            <br />
            <h1 className="w-[80%] mx-auto font-extrabold">問3）
                {
                    data?.text
                }
            </h1>
            <br />
            <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-center">
                    <Button
                        colorScheme={answer === data?.options[0] ? 'green' : 'gray'}
                        onClick={() => handleAnswer(data?.options[0])}
                        border='2px'
                        borderColor='black.500'
                    >
                        {
                            data?.options[0]
                        }
                    </Button>
                </div>
                <div className="flex justify-center">
                    <Button
                        colorScheme={answer === data?.options[1] ? 'green' : 'gray'}
                        onClick={() => handleAnswer(data?.options[1])}
                        border='2px'
                        borderColor='black.500'
                    >
                        {
                            data?.options[1]
                        }
                    </Button>
                </div>
                <div className="flex justify-center">
                    <Button
                        colorScheme={answer === data?.options[2] ? 'green' : 'gray'}
                        onClick={() => handleAnswer(data?.options[2])}
                        border='2px'
                        borderColor='black.500'
                    >
                        {
                            data?.options[2]
                        }
                    </Button>
                </div>

                <div className="flex justify-center">
                    <Button
                        colorScheme={answer === data?.options[3] ? 'green' : 'gray'}
                        onClick={() => handleAnswer(data?.options[3])}
                        border='2px'
                        borderColor='black.500'
                    >
                        {
                            data?.options[3]
                        }
                    </Button>
                </div>
            </div>
            <br />
            <div className="flex justify-center" >
                <input type="text" placeholder={"その他"} className="w-[80%] mx-auto border-2 border-black rounded bg-slate-100" onChange={handleOtherAnswer} />
            </div>
            <br />
            <br />
            <br />
            <br />
            <div className="flex justify-between mx-4">
                <Button
                    colorScheme='orange'
                    onClick={BackRouteHandleClick}
                >
                    戻る
                </Button>
                <Button
                    colorScheme='green'
                    onClick={NextRouteHandleClick}
                >
                    次へ
                </Button>
            </div>
            <br />
        </div>
    )
}

export default Page3;
