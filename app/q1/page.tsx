'use client'
import SurveyForm from "@/components/SurveyForm";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';
import { Progress } from '@chakra-ui/react'
import { useState, useEffect, useContext } from 'react';
import { useStateContext } from "../stateManegement";
import { aggregateStats, getData, saveResponse } from '@/lib/firebase';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { DocumentData, DocumentReference } from "firebase/firestore";

const Page1 = () => {
    const router = useRouter();
    const [answer, setAnswer] = useState<string | null>(null);
    const [data, setData] = useState<DocumentData | null>(null);
    const [docId, setDocId] = useState<string | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const { state, setState } = useStateContext();

    useEffect(() => {
        if (docId) {
            aggregateStats(docId);
        }
    }, [docId]);

    const NextRouteHandleClick = async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        event.preventDefault();
        if (answer) {
            const docID = await saveResponse("q1", answer);
            if (docID) {
                setState(prevState => ({
                    ...prevState,
                    docRefID1: docID,
                }));
                setDocId(docID);
            }
            // 回答が選択されている場合は次のページに遷移
            router.push('/q2');
        } else {
            // 回答が選択されていない場合はアラートを表示
            alert('回答を選択してください。');
        }
    }

    const BackRouteHandleClick = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        event.preventDefault();
        router.push('/');
    }

    const handleAnswer = (selectedAnswer: string) => {
        setAnswer(selectedAnswer);
        setProgress(20);
        //useContextを用いて答えをstateManegementのans1に保管
        setState(prevState => ({
            ...prevState,
            q1: selectedAnswer,
        }));
    }
    //これがなおらんし意味わからん。
    //エラーが発生している原因は、サーバーサイドレンダリング（SSR）環境でwindowオブジェクトにアクセスしようとしているためです。windowオブジェクトはブラウザ環境でのみ利用可能であり、サーバー側では存在しません。

    //Next.jsでは、useEffect内でブラウザ環境でのみ実行されるコードを記述する必要があります。useEffectの第2引数に空の依存配列[]を指定することで、コンポーネントのマウント時にのみ効果が実行されるようになります。
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
                const data = await getData("q1");
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
            <h1 className="w-[80%] mx-auto font-extrabold">
                問1)
                {
                    data?.text
                }
            </h1>
            <br />
            <div className="flex justify-around">
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
            <br />
            <br />
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

export default Page1;
