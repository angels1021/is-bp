import buildRoute from 'utils/routes-helper'; // eslint-disable-line import/no-unresolved
import Login from '../Login';

export default buildRoute({
  path: '/login',
  component(loadModule, injectors) {
    const { injectSagas } = injectors;
    Promise.all([
      import('./sagas')
    ]).then(([sagas]) => {
      // saga -> [[sagaName, sagaWatchersArray]]
      sagas.default.map((saga) => injectSagas(...saga));
      Login(loadModule);
    }).catch((ex) => {
      console.error('failed to load sagas for login page', ex); // eslint-disable-line no-console
    });
  }
});
