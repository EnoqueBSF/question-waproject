/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import React, { createContext, useState } from 'react';

import { api } from '~/services/api';

export interface IQuestion {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
  alternatives: string[];
  id?: number;
  hit?: boolean;
  chosen?: string;
}

interface ILoadQuestion {
  number: string;
}

export interface IStatistics {
  hits: number;
  errors: number;
  questions: IStatistic[];
}

export interface IStatistic {
  id: number;
  hit: boolean;
  chosen: string;
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
  alternatives: string[];
}

export interface IQuestionsContext {
  questions: IQuestion[];
  statistics: IStatistics;
  loadQuestions({ number }: ILoadQuestion): Promise<void>;
  insertStatistics({
    id,
    chosen,
    hit,
    category,
    correct_answer,
    difficulty,
    incorrect_answers,
    question,
    type,
    alternatives,
  }: IStatistic): void;
}

interface AuxProps {
  children: React.ReactChild | React.ReactChildren;
}

const QuestionContext = createContext<IQuestionsContext>(
  {} as IQuestionsContext,
);

const QuestionProvider: React.FC<AuxProps> = ({ children }: AuxProps) => {
  const [questions, setQuestions] = useState<IQuestion[]>([] as IQuestion[]);
  const [statistics, setStatistics] = useState<IStatistics>({
    hits: 0,
    errors: 0,
    questions: [],
  } as IStatistics);

  function shuffle(o: any[]) {
    for (
      let j, x, i = o.length;
      i;
      j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
    );
    return o;
  }

  const loadQuestions = async ({ number }: ILoadQuestion): Promise<void> => {
    const res = await api.get(`/api.php?amount=${number}`);
    const resData = res.data?.results.map((result: IQuestion) => {
      return {
        ...result,
        alternatives: shuffle([
          result.correct_answer,
          ...result.incorrect_answers,
        ]),
      };
    });
    setQuestions(resData);
  };

  const insertStatistics = ({
    id,
    chosen,
    hit,
    category,
    correct_answer,
    difficulty,
    incorrect_answers,
    question,
    type,
    alternatives,
  }: IStatistic) => {
    setStatistics(currentValue => {
      return {
        ...currentValue,
        hits: hit ? currentValue.hits + 1 : currentValue.hits,
        errors: !hit ? currentValue.errors + 1 : currentValue.errors,
        questions: [
          ...currentValue.questions,
          {
            id,
            chosen,
            hit,
            category,
            correct_answer,
            difficulty,
            incorrect_answers,
            question,
            type,
            alternatives,
          },
        ],
      };
    });
  };

  return (
    <QuestionContext.Provider
      value={{ questions, loadQuestions, insertStatistics, statistics }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export { QuestionProvider, QuestionContext };
