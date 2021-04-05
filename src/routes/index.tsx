import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Main from '../pages/Main';
import AssetsCompare from '../pages/AssetsCompare';
import Ranking from '../pages/Ranking';
import Company from '../pages/Company';
import AssetsExplorer from '../pages/AssetsExplorer';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Portfolio from '../pages/Portfolio';

const Routes = () => {

  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <PrivateRoute path="/home" component={Main} />
      <PrivateRoute path="/assets-compare" exact component={AssetsCompare} />
      <PrivateRoute path="/assets-compare/:id/:ticker" component={AssetsCompare} />
      <PrivateRoute path="/ranking" component={Ranking} />
      <PrivateRoute path="/company/:id/:ticker" component={Company} />
      <PrivateRoute path="/assets-explorer" component={AssetsExplorer} />
      <PrivateRoute path="/assets-explorer" exact component={AssetsExplorer} />
      <PrivateRoute path="/portfolio" exact component={Portfolio} />

      <Route path="/signup" component={Signup} />
      <Route path="/" component={Login} />

      <Route render={() => <Redirect to="/home" />} />
    </Switch>
  );
}

export default Routes;