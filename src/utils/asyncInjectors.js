import { conformsTo, isEmpty, isFunction, isObject, isString } from 'lodash-es';
import { invariant, warning } from './invariant';
import createReducer from '../store/reducers';

/**
 * Validate the shape of redux store
 */
export function checkStore(store) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    runSaga: isFunction,
    asyncReducers: isObject
  };
  invariant(
    conformsTo(store, shape),
    '(src/utils...) asyncInjectors: Expected a valid redux store'
  );
}

/**
 * Inject an asynchronously loaded reducer
 */
export function injectAsyncReducer(store, isValid) {
  return function injectReducer(name, asyncReducer) {
    if (!isValid) checkStore(store);

    invariant(
      isString(name) && !isEmpty(name) && isFunction(asyncReducer),
      '(src/utils...) injectAsyncReducer: Expected `asyncReducer` to be a reducer function'
    );

    if (Reflect.has(store.asyncReducers, name)) return;

    store.asyncReducers[name] = asyncReducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.asyncReducers));
  };
}

/**
 * Inject an asynchronously loaded saga
 */
export function injectAsyncSagas(store, isValid) {
  return function injectSagas(name, sagas) {
    if (!isValid) checkStore(store);

    invariant(
      Array.isArray(sagas),
      '(src/utils...) injectAsyncSagas: Expected `sagas` to be an array of generator functions'
    );

    warning(
      !isEmpty(sagas),
      '(src/utils...) injectAsyncSagas: Received an empty `sagas` array'
    );
    warning(
      name,
      '(src/utils...) injectAsyncSagas: Received a nameless empty `sagas` array. to skip saga caching pass name=true'
    );

    if (store.asyncSagas.has(name)) return;

    if (name && name !== true) {
      store.asyncSagas.add(name);
    }

    sagas.map(store.runSaga);
  };
}

/**
 * Helper for creating injectors
 */
export function getAsyncInjectors(store) {
  checkStore(store);

  return {
    injectReducer: injectAsyncReducer(store, true),
    injectSagas: injectAsyncSagas(store, true)
  };
}
