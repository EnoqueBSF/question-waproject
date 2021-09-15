import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { QuestionProvider } from './context/QuestionContext';
import Routes from './routes';

import 'react-toastify/dist/ReactToastify.css';
import '~/app.css';

const App: React.FC = () => (
  <BrowserRouter>
    <ToastContainer />
    <QuestionProvider>
      <Routes />
    </QuestionProvider>
  </BrowserRouter>
);

export default App;
