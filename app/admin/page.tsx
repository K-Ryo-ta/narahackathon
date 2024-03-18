'use client'
import { useState } from 'react';
import { Question } from '../../types/type';
import { mockQuestions } from '../../data/data';

const page = () => {
    const [questions, setQuestions] = useState<Question[]>(mockQuestions);
    const [question, setQuestion] = useState('');
    const [type, setType] = useState<'button' | 'text'>('button');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newQuestion: Question = { question, type };
        setQuestions([...questions, newQuestion]);
        setQuestion('');
        setType('button');
    };

    return (
        <div>
            <h1>管理者ページ</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="質問を入力"
                />
                <select value={type} onChange={(e) => setType(e.target.value as 'button' | 'text')}>
                    <option value="button">ボタン</option>
                    <option value="text">記述式</option>
                </select>
                <button type="submit">質問を追加</button>
            </form>
            <ul>
                {questions.map((q, index) => (
                    <li key={index}>
                        {q.question} ({q.type})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default page;
