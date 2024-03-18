'use client'
import SurveyForm from "@/components/SurveyForm";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

export default function Home() {
  const router = useRouter();

  const RouteHandleClick = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    event.preventDefault();
    router.push('/q1');
  }

  return (
    <div className="max-w-[340px] mx-auto rounded-2xl bg-gray-100 w-[90vw]  mt-5 ">
      <br />
      <br />
      <h1 className="w-[80%] text-center mx-auto font-extrabold">この度はご利用いただき誠にありがとうございます!</h1>
      <br />
      <br />
      <p className="w-[80%] text-center mx-auto">より良い買い物を支援をしていくためにみなさんに役立つ暮らしのアドバイス、今月のおすすめ商品、クーポンなどをご用意しております。以下の簡単なアンケートをご回答していただくとGETできます！</p>
      <br />
      <br />
      <p className="w-[80%] text-center mx-auto">こちらのアンケートは皆さんのご意見・要望を受け止め、より良いサービスにするのが目的となっておりますのでぜひご回答お願いいたします。</p>
      <br />
      <br />

      <div className="flex justify-center">
        <Button
          colorScheme='green'
          onClick={RouteHandleClick}
          whiteSpace="normal"
          textAlign="center"
          height="auto"
          py={2}
        >
          暮らしのアドバイスをGET！
          <br />
          アンケートを回答
        </Button>
      </div>
      <br />
    </div>
  );
}
