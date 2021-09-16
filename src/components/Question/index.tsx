/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { IQuestion } from '~/context/QuestionContext';
import useQuestion from '~/hooks/useQuestion';
import { alphabet } from '~/utils';

interface IProps {
  data: IQuestion;
  page: number;
  onContinue: () => void;
}

interface IChosenOption {
  chosen: string;
  hit: boolean | undefined;
}

const Question: React.FC<IProps> = ({ data, page, onContinue }: IProps) => {
  const [chosenOption, setChosenOption] = useState<IChosenOption>({
    chosen: '',
    hit: false,
  });
  const history = useHistory();
  const { insertStatistics } = useQuestion();

  useEffect(() => {
    if (!data) history.push('/reports');
    setChosenOption({
      chosen: '',
      hit: false,
    });
    if (data.chosen) {
      setChosenOption({
        chosen: data.chosen,
        hit: data.hit,
      });
    }
  }, [data, history]);

  const sanitize = (text: string): string => {
    return text.replaceAll(/&quot;/gm, '').replaceAll(/&#039;/gm, '');
  };

  const chosen = (alternative: string) => {
    if (alternative === data.correct_answer) {
      setChosenOption({ chosen: alternative, hit: true });
      insertStatistics({ ...data, chosen: alternative, hit: true, id: page });
    } else {
      setChosenOption({ chosen: alternative, hit: false });
      insertStatistics({ ...data, chosen: alternative, hit: false, id: page });
    }
    setTimeout(() => {
      setChosenOption({ chosen: '', hit: false });
      onContinue();
    }, 2000);
  };

  const renderItem = () => {
    switch (data.type) {
      case 'boolean':
        return (
          <Grid
            item
            xs={12}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {data.alternatives.map((answer, index) => (
              <Button
                type="button"
                key={answer}
                onClick={() => chosen(answer)}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  backgroundColor:
                    chosenOption.chosen === answer
                      ? chosenOption.hit
                        ? 'green'
                        : 'red'
                      : chosenOption.chosen
                      ? answer === data.correct_answer
                        ? 'green'
                        : ''
                      : '',
                  marginTop: '10px',
                  padding: '10px 20px',
                  border: 'solid 1px #000',
                }}
                disabled={!!chosenOption.chosen}
              >
                {`${alphabet[index]}. ${sanitize(answer)}`}
              </Button>
            ))}
          </Grid>
        );
      case 'multiple':
        return (
          <Grid
            item
            xs={12}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {data.alternatives.map((answer, index) => (
              <Button
                type="button"
                key={answer}
                onClick={() => chosen(answer)}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  backgroundColor:
                    chosenOption.chosen === answer
                      ? chosenOption.hit
                        ? 'green'
                        : 'red'
                      : chosenOption.chosen
                      ? answer === data.correct_answer
                        ? 'green'
                        : ''
                      : '',
                  marginTop: '10px',
                  padding: '10px 20px',
                  border: 'solid 1px #000',
                }}
                disabled={!!chosenOption.chosen}
              >
                {`${alphabet[index]}. ${sanitize(answer)}`}
              </Button>
            ))}
          </Grid>
        );

      default:
        return <div />;
    }
  };

  return (
    <div
      style={{
        width: '80%',
        background: '#fff',
        padding: '50px',
        boxSizing: 'border-box',
        borderRadius: '25px',
        margin: '30px 0px',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
      }}
    >
      <p>
        Questão {page + 1} - {sanitize(data.question)}
      </p>
      {renderItem()}
    </div>
  );
};

export default Question;
