import buildRoute from 'utils/routes-helper'; // eslint-disable-line import/no-unresolved
import Auth from '../Auth';
import loginRoute from './routes/Login/route';
import registerRoute from './routes/Register/route';

export default buildRoute({
  component(loadModule, injectors) {
    const { injectReducer } = injectors;
    Promise.all([
      import('./reducer')
    ]).then(([reducer]) => {
      injectReducer('authModule', reducer.default);
      Auth(loadModule);
    }).catch((ex) => {
      console.error('failed to load reducer for auth module', ex);
    });
  },
  childRoutes: [
    loginRoute,
    registerRoute
  ]
});
