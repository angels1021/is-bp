import buildRoute from 'utils/routes-helper';
// import importAsync from 'utils/importAsync';
import CR from '../CR';
import customersRoute from './routes/Customers/route';
import receiptsRoute from './routes/Receipts/route';

export default buildRoute({
  path: '/',
  component: CR,
  childRoutes: [
    customersRoute,
    receiptsRoute
  ]
});
