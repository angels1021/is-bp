import buildRoute from 'utils/routes-helper'; // eslint-disable-line import/no-unresolved
import Auth from '../Auth';
import loginRoute from './routes/Login/route';
import registerRoute from './routes/Register/route';

export default buildRoute({
  component(loadModule, injectors) {
    const { injectReducer, injectSagas, fetchDependencies } = injectors;
    Promise.all([
      import('./reducer'),
      import('./sagas')
    ]).then(([reducer, sagas]) => {
      injectReducer('authModule', reducer.default);
      injectSagas('authModule', sagas.default);
      fetchDependencies('authModule');
      Auth(loadModule);
    }).catch((ex) => {
      console.error('failed to load reducer for auth module', ex); // eslint-disable-line no-console
    });
  },
  childRoutes: [
    loginRoute,
    registerRoute
  ]
});
