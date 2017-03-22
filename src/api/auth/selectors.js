/**
 * The auth selectors
 */
import { createSelector } from 'reselect';
import { memoize } from 'lodash-es';

const selectAuth = () => memoize((state) => state.get('auth'));

export const selectUser = () => createSelector(
  selectAuth(),
  (auth) => auth.get('user')
);

export const selectUserId = () => createSelector(
  selectUser(),
  (user) => user.get('id')
);

export const selectAuthenticated = () => createSelector(
  selectAuth(),
  (auth) => auth.get('isLoggedIn')
);
