/**
 * Auth route selectors
 */
import { createSelector } from 'reselect';
import { memoize } from 'lodash-es';

export const selectAuth = () => memoize((state) => state.get('authModule'));

export const selectLocaleState = () => createSelector(
  selectAuth(),
  (auth) => auth.get('locale')
);

export const selectLocale = () => createSelector(
  selectLocaleState(),
  (localeState) => localeState.get('locale')
);
