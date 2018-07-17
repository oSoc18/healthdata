import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Explorer from './components/Explorer';
import NotFound from './components/404';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/:path(|index|home)" component={Home} />
      <Route exact path="/:path(explorer)" component={Explorer} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;
