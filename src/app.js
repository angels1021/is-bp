/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// Import our modules
import { selectLocationState } from 'common/containers/App/selectors';
import configureStore from './store';
import buildAppRoutes from './routes';

// Import CSS reset and Global Styles
import './style/style.scss';

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};
const store = configureStore(initialState, browserHistory);

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: selectLocationState()
});

const routes = buildAppRoutes(store);

render(
  <Provider store={store} >
    <Router
      history={history}
      routes={routes}
    />
  </Provider>,
  document.getElementById('app')
);
//
// if (module.hot) {
//   module.hot.accept('./routes', () => {
//     const NewRoot = require('./routes').default; // eslint-disable-line global-require
//
//     render(
//       <NewRoot />,
//       document.getElementById('root')
//     );
//   });
// }
