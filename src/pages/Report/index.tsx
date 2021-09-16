import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import useLocalStorage from '~/hooks/useLocalStorage';
import useQuestion from '~/hooks/useQuestion';
import Question from '~/components/Question';

const Report: React.FC = () => {
  const history = useHistory();
  const { statistics, cleanStatistics } = useQuestion();
  const { create, find } = useLocalStorage();

  useEffect(() => {
    if (statistics.questions.length === 0) history.push('/');
    const statistic = find({ key: 'statistics' });
    if (statistic) {
      // console.log([...JSON.parse(statistic), statistics]);
      create({
        key: 'statistics',
        data: JSON.stringify([...JSON.parse(statistic), statistics]),
      });
    } else {
      create({
        key: 'statistics',
        data: JSON.stringify([statistics]),
      });
    }

    return () => {
      cleanStatistics();
    };
  }, []);

  return (
    <div
      style={{
        padding: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={() => history.push('/')}
      >
        Home
      </Button>
      <p>
        Você fez {statistics.hits} acerto(s) e {statistics.errors} erro(s)
      </p>
      {statistics.questions.map(question => (
        <Question
          data={question}
          page={question.id}
          onContinue={() => null}
          key={question.id}
        />
      ))}
    </div>
  );
};

export default Report;
