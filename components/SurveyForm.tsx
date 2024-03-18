'use client'
import { useState } from 'react';
import { Question, Answer } from '../types/type';
import { mockQuestions } from '../data/data';

const SurveyForm = () => {
    const [questions, setQuestions] = useState<Question[]>(mockQuestions);
    const [answers, setAnswers] = useState<Answer>({});

    const handleAnswer = (questionIndex: number, answer: string) => {
        setAnswers({ ...answers, [questionIndex]: answer });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(answers);
        // ここでアンケート回答を送信する処理を追加
    };

    return (
        <form onSubmit={handleSubmit}>
            {questions.map((q, index) => (
                <div key={index}>
                    <p className=''>{q.question}</p>
                    {q.type === 'button' ? (
                        <div>
                            <button type="button" onClick={() => handleAnswer(index, 'はい')}>
                                はい
                            </button>
                            <button type="button" onClick={() => handleAnswer(index, 'いいえ')}>
                                いいえ
                            </button>
                        </div>
                    ) : (
                        <input
                            type="text"
                            onChange={(e) => handleAnswer(index, e.target.value)}
                        />
                    )}
                </div>
            ))}
            <button type="submit">送信</button>
        </form>
    );
};

export default SurveyForm;
