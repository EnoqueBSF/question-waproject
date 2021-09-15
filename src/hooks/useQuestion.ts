import { useContext } from 'react';
import { QuestionContext, IQuestionsContext } from '~/context/QuestionContext';

const useQuestion = (): IQuestionsContext => {
  const context = useContext(QuestionContext);

  if (!context) {
    throw new Error('useQuestion must be used within an QuestionProvider');
  }

  return context;
};

export default useQuestion;
