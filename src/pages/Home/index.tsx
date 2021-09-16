import React, { useRef } from 'react';
import { Button, Grid, makeStyles, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Container from '~/components/Container';
import useLocalStorage from '~/hooks/useLocalStorage';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Home: React.FC = () => {
  const numberRef = useRef('');
  const history = useHistory();
  const classes = useStyles();
  const { find } = useLocalStorage();

  const handleSubmit = () => {
    if (
      parseInt(numberRef?.current, 10) > 0 &&
      parseInt(numberRef?.current, 10) <= 50
    ) {
      history.push(`/decision/questions/${numberRef?.current}`);
    } else {
      toast.error('Número não é válido.');
    }
  };

  return (
    <Container>
      <Grid container xs={12}>
        {JSON.parse(find({ key: 'statistics' })) && (
          <Button
            className={classes.submit}
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => history.push('/reports')}
          >
            Reports anteriores
          </Button>
        )}
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="amountQuestion"
            label="Quantas perguntas deseja responder?"
            name="amountQuestion"
            type="number"
            autoFocus
            onChange={e => {
              numberRef.current = e.target.value;
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            className={classes.submit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => handleSubmit()}
          >
            Ok
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
