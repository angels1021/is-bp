import buildRoute from 'utils/routes-helper';
// import importAsync from 'utils/importAsync';
import CR from '../CR';
import customersRoute from './routes/Customers/route';
import receiptsRoute from './routes/Receipts/route';

export default buildRoute({
  path: '/',
  component(loadModule, injectors) {
    const { injectSagas } = injectors;

    Promise.all([
      import('api/user/sagas')
    ]).then(([sagas]) => {
      injectSagas('user', sagas.default);
      CR(loadModule);
    }).catch((ex) => {
      console.error('failed to load sagas for cr', ex);
    });
  },
  childRoutes: [
    customersRoute,
    receiptsRoute
  ]
});
