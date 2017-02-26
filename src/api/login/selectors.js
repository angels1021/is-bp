/**
 * The auth selectors
 */
import { createSelector } from 'reselect';

const selectAuth = (state) => state.get('auth');

export const selectAuthenticated = () => createSelector(
  selectAuth,
  (auth) => auth.get('isLoggedIn')
);

export const selectUser = () => createSelector(
  selectAuth,
  (auth) => auth.get('user')
);
