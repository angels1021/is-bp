import buildRoute from 'utils/routes-helper';
import Customers from '../Customers';

export default buildRoute({
  path: '/customers',
  component: Customers
});
