'use client'
import SurveyForm from "@/components/SurveyForm";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';
import { useContext } from 'react';
import StateContext from "../stateManegement";

const FinishPage = () => {
    const router = useRouter();
    const stateInfo = useContext(StateContext);

    // const NextRouteHandleClick = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    //     event.preventDefault();
    //     if (answer) {
    //         // 回答が選択されている場合は次のページに遷移
    //         router.push('/finish');
    //     } else {
    //         // 回答が選択されていない場合はアラートを表示
    //         alert('回答を選択してください。');
    //     }
    // }

    // const BackRouteHandleClick = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    //     event.preventDefault();
    //     router.push('/q4');
    // }

    const handleAdvice = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        event.preventDefault();
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
