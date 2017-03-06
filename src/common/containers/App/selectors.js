/**
 * The global state selectors
 */
import { createSelector } from 'reselect';
import { memoize } from 'lodash-es';

export const selectGlobal = () => (state) => state.get('global');

export const selectAsync = () => createSelector(
  selectGlobal(),
  (global) => global.get('async')
);

export const selectLoading = () => createSelector(
  selectAsync(),
  (asyncState) => asyncState.get('loading')
);

export const selectErrors = () => createSelector(
  selectAsync(),
  (asyncState) => asyncState.get('errors')
);

export const selectRequestLoading = () => createSelector(
  selectLoading(),
  (requests) => memoize((requestId) => requests.includes(requestId))
);

export const selectRequestErrors = () => createSelector(
  selectErrors(),
  (requests) => memoize((requestId) => (requests.has(requestId) ? requests.get(requestId) : false))
);

export const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route');

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};
