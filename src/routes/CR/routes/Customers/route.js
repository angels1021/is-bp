import buildRoute from 'utils/routes-helper';
import Customers from '../Customers';

export default buildRoute({
  path: '/cr/customers',
  component: Customers
});
