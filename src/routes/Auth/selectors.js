/**
 * Auth route selectors
 */
import { createSelector } from 'reselect';
import { memoize } from 'lodash-es';

const selectAuth = () => memoize((state) => state.get('authRoute'));

export const selectLocaleState = () => createSelector(
  selectAuth(),
  (auth) => auth.get('locale')
);

export const selectLocale = () => createSelector(
  selectLocaleState(),
  (localeState) => localeState.get('locale')
);
