import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Main from '../pages/Main';
import AssetsCompare from '../pages/AssetsCompare';
import Ranking from '../pages/Ranking';
import Company from '../pages/Company';
import AssetsExplorer from '../pages/AssetsExplorer';
import Login from '../pages/Login';


const Routes = () => {
  
  return (
    <Switch>
        <Route path="/" exact component={Login} />
        <PrivateRoute path="/home" component={Main} />
        <PrivateRoute path="/assets-compare" component={AssetsCompare} />
        <PrivateRoute path="/ranking" component={Ranking} />
        <PrivateRoute path="/company/:id/:ticker" component={Company}/>
        <PrivateRoute path="/assets-explorer" component={AssetsExplorer} />

        <Route render={() => <Redirect to="/home" />} />
    </Switch>
  );
}

export default Routes;