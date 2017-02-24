import buildRoute from 'utils/routes-helper'; // eslint-disable-line import/no-unresolved
import Auth from '../Auth';
import loginRoute from './routes/Login/route';
import registerRoute from './routes/Register/route';

export default buildRoute({
  component: Auth,
  childRoutes: [
    loginRoute,
    registerRoute
  ]
});
