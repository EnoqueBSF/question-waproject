import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import background from '~/assets/abstract.jpeg';

const useStyles = makeStyles(() => ({
  container: {
    minWidth: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    background: '#F6F6F6',
  },
}));

interface IProps {
  children: React.ReactChild | React.ReactChildren;
}

const ContainerCompoent: React.FC<IProps> = ({ children }: IProps) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      {children}
    </Container>
  );
};

export default ContainerCompoent;
