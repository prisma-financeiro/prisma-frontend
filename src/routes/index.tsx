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
      <PrivateRoute path="/compare-assets" exact component={AssetsCompare} />
      <PrivateRoute path="/compare-assets/:id/:ticker" component={AssetsCompare} />
      <PrivateRoute path="/ranking" component={Ranking} />
      <PrivateRoute path="/assets" exact component={AssetsExplorer} />
      <PrivateRoute path="/assets/company/:id/:ticker" component={Company} />
      <PrivateRoute path="/portfolio" exact component={Portfolio} />

      <Route path="/signup" component={Signup} />
      <Route path="/" component={Login} />

      <Route render={() => <Redirect to="/home" />} />
    </Switch>
  );
}

export default Routes;