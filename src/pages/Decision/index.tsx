import { Button, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useQuestion from '~/hooks/useQuestion';
import Container from '~/components/Container';

interface IParams {
  numbers: string;
}

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

const Decision: React.FC = () => {
  const { numbers }: IParams = useParams();
  const history = useHistory();
  const { loadQuestions } = useQuestion();
  const classes = useStyles();

  return (
    <Container>
      <Grid container xs={12}>
        <Grid item xs={12}>
          <p>
            Você deseja permanecer com essa quantidade de questões {numbers}?
          </p>
        </Grid>

        <Grid item xs={12} className={classes.container}>
          <Grid item xs={5}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={async () => {
                await loadQuestions({ number: numbers });
                history.push(`/questions`);
              }}
            >
              Sim
            </Button>
          </Grid>
          <Grid item xs={5}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => {
                history.push(`/`);
              }}
            >
              Não
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Decision;
