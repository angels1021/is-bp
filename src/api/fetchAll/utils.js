/**
 * Helper Generators not exclusive to fetchAll saga.
 */

import { fork, take, put, select, race, call } from 'redux-saga/effects';
import { MESSAGES_SUCCESS, MESSAGES_FAIL } from 'api/translations/constants';
import { requestMessages } from 'api/translations/actions';
import { selectRequestLoading, selectRequestErrors } from 'common/containers/App/selectors';

/**
 * fetch resources where their success/fail event are important to page load
 * for resources where it doesn't matter, call fork(put, action) instead.
 *
 * @param {object} action - redux action object
 * @param {string} takeSuccess - success constant to listen for
 * @param {string} takeFail - fail constant to listen for
 * @returns {boolean}
 */
export function* fetchResource(action, takeSuccess, takeFail) {
  yield put(action);
  const { fail, success } = yield race({
    success: take(takeSuccess),
    fail: take(takeFail)
  });
  if (fail) {
    throw fail.payload.error;
  }
  return success;
}

/**
 * high level call to fetchResource, specific to translations
 *
 * @param {function} selectLocale - selector function to get current module's locale
 * @param {object[]} request - request translations for the modules specified.
 * @property {string} request[].module - ie 'app'.
 * @property {string} request[].page ie  -'common'.
 */
export function* fetchMessages(selectLocale, request) {
  // prep messages
  const locale = yield select(selectLocale);
  // call messages
  yield fork(
    fetchResource,
    requestMessages(locale, request),
    MESSAGES_SUCCESS,
    MESSAGES_FAIL
  );
}

/**
 * helper generator for waitForOther
 *
 * @param {string} requestId         - requestId to track in global async requests
 * @param {function} loadingSelector - selector to check if the request is still loading
 * @param {function} errorSelector   - selector to check if the request has failed
 * @param {function} resolveSelector - selector function that must resolve to true before starting calls
 * @returns {{isLoading: boolean, resolved: boolean}}
 */
export function* checkSelectors({ requestId, loadingSelector, errorSelector, resolveSelector }) {
  const checkError = yield select(errorSelector);
  const hasError = checkError(requestId);
  // throw to fail child page waiting for a parent that failed
  if (hasError) throw hasError;
  const isLoading = yield select(loadingSelector);
  const resolved = yield select(resolveSelector);
  return { isLoading: isLoading(requestId), resolved };
}

/**
 * helper generator for callFetchSaga
 * wait for another module or page to finish loading before moving on
 *
 * @param {string} requestId          - requestId to track in global async requests
 * @param {function} [resolveSelector] - selector function that must resolve to true before starting calls
 */
export function* waitForOther(requestId, resolveSelector = () => true) {
  const loadingSelector = selectRequestLoading();
  const errorSelector = selectRequestErrors();
  const selectorOpts = { requestId, loadingSelector, errorSelector, resolveSelector };
  let { isLoading, resolved } = yield call(checkSelectors, selectorOpts);
  while (isLoading || !resolved) {
    const response = yield call(checkSelectors, selectorOpts);
    isLoading = response.isLoading;
    resolved = response.resolved;
  }
}

export const createRequestId = (moduleId) => `${moduleId}/FETCH_ALL`;
