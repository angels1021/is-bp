import { UserAuthWrapper } from 'redux-auth-wrapper';
import { push } from 'react-router-redux';
import { selectAuthenticated } from 'api/login/selectors';

// only allow authenticated users view comnponents wrapped by 'authenticatedUsers'
export const authenticatedUsers = UserAuthWrapper({
  authSelector: (state) => state,
  predicate: selectAuthenticated(),
  redirectAction: push,
  failureRedirectPath: '/login',
  wrapperDisplayName: 'UserIsAuthenticated'
});
