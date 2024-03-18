import { useState } from 'react';
import { Question, Answer } from '../types/type';
import { mockQuestions } from '../data/data';

const SurveyForm = () => {
    const [questions, setQuestions] = useState<Question[]>(mockQuestions);
    const [answers, setAnswers] = useState<Answer>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

    const handleAnswer = (questionIndex: number, answer: string) => {
        setAnswers({ ...answers, [questionIndex]: answer });
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(answers);
        // ここでアンケート回答を送信する処理を追加
    };

    return (
        <form onSubmit={handleSubmit}>
            {questions.map((q, index) => (
                <div key={index} style={{ display: index === currentQuestionIndex ? 'block' : 'none' }}>
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
            <div>
                {currentQuestionIndex > 0 && (
                    <button type="button" onClick={handlePreviousQuestion}>
                        戻る
                    </button>
                )}
                {currentQuestionIndex < questions.length - 1 && (
                    <button type="button" onClick={handleNextQuestion}>
                        次へ
                    </button>
                )}
                {currentQuestionIndex === questions.length - 1 && (
                    <button type="submit">送信</button>
                )}
            </div>
        </form>
    );
};

export default SurveyForm;
