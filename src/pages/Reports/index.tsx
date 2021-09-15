import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '~/hooks/useLocalStorage';
import useQuestion from '~/hooks/useQuestion';
import Question from '~/components/Question';
import { IStatistics } from '~/context/QuestionContext';

const Reports: React.FC = () => {
  const history = useHistory();
  const { statistics } = useQuestion();
  const { create, find } = useLocalStorage();
  const [stars, setStarts] = useState([]);

  useEffect(() => {
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

    setStarts(JSON.parse(find({ key: 'statistics' })));

    return () => {
      history.push('/');
    };
  }, []);

  return (
    <div
      style={{
        padding: '50px',
      }}
    >
      {stars.map((star: IStatistics, index) => (
        <Accordion style={{ marginTop: 10 }}>
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            expandIcon={<ExpandMore />}
          >
            <Typography>Tentativa {index + 1}</Typography>
          </AccordionSummary>
          {star.questions.map(question => (
            <Question
              data={question}
              page={question.id}
              onContinue={() => null}
              key={question.id}
            />
          ))}
        </Accordion>
      ))}
    </div>
  );
};

export default Reports;
