import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import AssetsExplorer from './pages/AssetsExplorer';
import AssetsCompare from './pages/AssetsCompare';
import Ranking from './pages/Ranking';
import Company from './pages/Company';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/assets-explorer" exact component={AssetsExplorer} />
      <Route path="/assets-compare" exact component={AssetsCompare} />
      <Route path="/ranking" exact component={Ranking} />
      <Route path="/company/:id/:ticker" exact component={Company}/>
    </Switch>
  );
}

export default Routes;