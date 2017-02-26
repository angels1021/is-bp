/**
* @module Routes
*
* These are all the main routes.
* structure is by folder structure
* any index.js to match the expression: /routes/{container}/index.js
* will automatically be lazyloaded and will have the 'injectors'
* available to it in it's route.component function.
* for clarity, each route contains it's own definitions 'route.js' file.
*
* @example
  import buildRoute from 'utils/routes-helper';
  import importAsync from 'utils/importAsync';
  import CR from '../CR';
  import customersRoute from './routes/Customers/route';
  import receiptsRoute from './routes/Receipts/route';

  export default buildRoute({
    path: '/cr',
    component(loadModule, injectors) {
      const { injectReducer, injectSagas } = injectors;

      Promise.all([
        importAsync('./reducer'),
        importAsync('./sagas')
      ]).then(([reducer, sagas])=>{
        injectReducer('cr', reducer.default);
        injectSagas(sagas.default);
        CR(loadModule);
      }).catch(...);

    },
    childRoutes: [
      customersRoute,
      receiptsRoute
    ]
  });
*
*/

// import React from 'react';
import buildRoute from 'utils/routes-helper';
import App from 'common/containers/App';
import { getAsyncInjectors } from 'utils/asyncInjectors';
import { authenticatedUsers } from 'utils/auth/access';
import authRoute from './Auth/route';
import crRoute from './CR/route';
import msRoute from './MS/route';
import sampleRoute from './Sample/route';

// create wrapper component for login protected pages.
const Authenticated = authenticatedUsers(({ children }) => (children));

const buildAppRoutes = (store) => {
   // create reusable async injectors using getAsyncInjectors factory
  // injectors = { injectReducer, injectSagas }
  const injectors = getAsyncInjectors(store);
  return buildRoute({
    component: App,
    childRoutes: [
      authRoute,
      sampleRoute,
      buildRoute({
        component: Authenticated,
        childRoutes: [
          crRoute,
          msRoute
        ]
      })
    ]
  })(injectors);
};

export default buildAppRoutes;
