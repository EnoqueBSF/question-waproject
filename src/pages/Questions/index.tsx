import React, { useState } from 'react';
import { Pagination } from '@material-ui/lab';
import { Grid, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useQuestion from '~/hooks/useQuestion';
import Question from '~/components/Question';
import Container from '~/components/Container';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%',
  },
}));

const Questions: React.FC = () => {
  const history = useHistory();
  const { questions } = useQuestion();
  const [page, setPage] = useState(0);

  const classes = useStyles();

  const handleChangePage = (number: number): void => {
    if (number >= 0 && number <= questions.length) {
      if (number >= questions.length) {
        history.push('/report');
      }
      setPage(number);
    }
  };

  return (
    <Container>
      <div className={classes.container}>
        <Pagination
          count={questions.length}
          page={page + 1}
          variant="outlined"
        />
        <Question
          data={questions[page]}
          page={page}
          onContinue={() => handleChangePage(page + 1)}
        />
        <Grid item xs={12} sm={6}>
          {/* <Button
            onClick={() => handleChangePage(page - 1)}
            disabled={page > 0}
          >
            {'<'}
          </Button>
          {page + 1 === questions.length ? (
            <Button onClick={() => handleChangePage(page + 1)} disabled>
              Estatística
            </Button>
          ) : (
            <Button onClick={() => handleChangePage(page + 1)} disabled>
              {'>'}
            </Button>
          )} */}
        </Grid>
      </div>
    </Container>
  );
};

export default Questions;
