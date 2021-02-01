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


const Routes = () => {
  
  return (
    <Switch>
        <PrivateRoute path="/home" exact component={Main} />
        <PrivateRoute path="/assets-compare" exact component={AssetsCompare} />
        <PrivateRoute path="/ranking" exact component={Ranking} />
        <PrivateRoute path="/company/:id/:ticker" component={Company}/>
        <PrivateRoute path="/assets-explorer" exact component={AssetsExplorer} />
        
        <Route path="/signup" component={Signup} />
        <Route path="/" component={Login} />

        <Route render={() => <Redirect to="/home" />} />
    </Switch>
  );
}

export default Routes;