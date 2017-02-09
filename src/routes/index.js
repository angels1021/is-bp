import React from 'react';
import { Router, browserHistory } from 'react-router/es';
import App from 'containers/App'; // eslint-disable-line import/no-unresolved
import crRoute from './CR/route';
import msRoute from './MS/route';
import sampleRoute from './Sample/route';

const routes = {
  path: '/',
  component: App,
  childRoutes: [
    crRoute,
    msRoute,
    sampleRoute
  ]
};

export default () => <Router history={browserHistory} routes={routes} />;
