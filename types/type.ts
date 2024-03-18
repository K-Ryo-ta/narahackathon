export type QuestionType = 'button' | 'text';

export interface Question {
  question: string;
  type: QuestionType;
}

export interface Answer {
  [key: number]: string;
}
