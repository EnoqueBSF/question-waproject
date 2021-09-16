import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  Button,
  Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/esm/locale/pt/index.js';
import useLocalStorage from '~/hooks/useLocalStorage';
import Question from '~/components/Question';
import { IStatistics } from '~/context/QuestionContext';

const Reports: React.FC = () => {
  const { find } = useLocalStorage();
  const [stars, setStarts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const res = JSON.parse(find({ key: 'statistics' }));
    if (!res) history.push('/');
    setStarts(res);
  }, []);

  return (
    <div
      style={{
        padding: '50px',
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
      {stars.map((star: IStatistics, index) => (
        <Accordion
          style={{
            marginTop: 10,
          }}
          key={`${star.key}`}
        >
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            expandIcon={<ExpandMore />}
          >
            <Typography>
              Tentativa {index + 1} -{' '}
              {formatDistance(parseISO(`${star.key}`), new Date(), {
                addSuffix: true,
                locale: pt,
              })}
            </Typography>
          </AccordionSummary>
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <p>
              Você fez {star.hits} acerto(s) e {star.errors} erro(s)
            </p>
            {star.questions.map(question => (
              <Question
                data={question}
                page={question.id}
                onContinue={() => null}
                key={question.id}
              />
            ))}
          </div>
        </Accordion>
      ))}
    </div>
  );
};

export default Reports;
