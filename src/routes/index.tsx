import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '~/pages/Home';
import Decision from '~/pages/Decision';
import Questions from '~/pages/Questions';
import Reports from '~/pages/Reports';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/decision/questions/:numbers" exact component={Decision} />
    <Route path="/questions" exact component={Questions} />
    <Route path="/reports" exact component={Reports} />
  </Switch>
);

export default Routes;
