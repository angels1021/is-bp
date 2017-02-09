import buildRoute from 'utils/routes-helper';
import CR from '../CR';
import customersRoute from './routes/Customers/route';
import receiptsRoute from './routes/Receipts/route';

export default buildRoute({
  path: '/cr',
  component: CR,
  childRoutes: [
    customersRoute,
    receiptsRoute
  ]
});
