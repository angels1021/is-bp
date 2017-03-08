import buildRoute from 'utils/routes-helper'; // eslint-disable-line import/no-unresolved
import Login from '../Login';

export default buildRoute({
  path: '/login',
  component(loadModule, injectors) {
    const { fetchDependencies } = injectors;
    Promise.all([
      import('./sagas')
    ]).then(([sagas]) => {
      fetchDependencies(sagas.fetchOptions);
      Login(loadModule);
    }).catch((ex) => {
      console.error('failed to load sagas for login page', ex); // eslint-disable-line no-console
    });
  }
});
