/**
 * The global state selectors
 */
import { createSelector } from 'reselect';

export const selectGlobal = () => (state) => state.get('global');

export const selectCurrentUser = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('currentUser')
);

export const selectLoading = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('loading')
);

export const selectError = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('error')
);

export const selectProducts = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['userData', 'products'])
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
