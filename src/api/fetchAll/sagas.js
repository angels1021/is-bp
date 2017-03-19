/**
 * Helper Generators not exclusive to fetchAll saga.
 */
import { delay } from 'redux-saga';
import { fork, take, put, select, race, call } from 'redux-saga/effects';
import { MESSAGES_SUCCESS, MESSAGES_FAIL } from 'api/translations/constants';
import { requestMessages } from 'api/translations/actions';
import { selectRequestLoading, selectRequestErrors } from 'common/containers/App/selectors';
import { ASYNC_SUCCESS, ASYNC_FAIL } from 'common/containers/App/constants';
import { asyncSuccess, asyncFail, asyncRequest } from 'common/containers/App/actions';

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
 * helper watcher for waitForOther.
 * watches for any ASYNC_SUCCESS or ASYNC_FAIL, actions to check if the requested id matches the completed call
 * will throw on error
 *
 * @param {string} requestId - requestId to track in global async requests
 * @return {boolean/object}  - if ASYNC_FAIL was dispatched, return the Error object
 */
export function* waitForComplete(requestId) {
  let isMatch = false;
  // wait for the correct requestId
  while (!isMatch) {
    const { meta: { id }, error, payload } = yield take([ASYNC_SUCCESS, ASYNC_FAIL]);
    isMatch = id === requestId;
    if (isMatch && error) {
      throw payload;
    }
  }
  return true;
}

/**
 * helper generator for callFetchSaga
 * wait for another module or page to finish loading before moving on
 *
 * @param {string} requestId           - requestId to track in global async requests
 * @param {function} [resolveSelector] - selector function that must resolve to true before starting calls
 */
export function* waitForOther(requestId, resolveSelector = () => true) {
  const loadingSelector = selectRequestLoading();
  const isLoading = yield select(loadingSelector);
  // check for errors.
  if (!isLoading(requestId)) {
    const errorSelector = selectRequestErrors();
    const hasError = yield select(errorSelector);
    if (hasError(requestId)) {
      // if the request has already failed, throw to fail the waiting request as well.
      throw hasError(requestId);
    }
  }
  let resolved = yield select(resolveSelector);
  if (isLoading(requestId)) {
    // start race to resolve the request.
    yield call(waitForComplete, requestId);
  }
  // if resolveSelector is not resolved by now, wait for it
  while (!resolved) {
    resolved = yield select(resolveSelector);
    // debounce checks
    if (!resolved) yield call(delay, 200);
  }
  return true;
}

/**
 * call specified fetchGenerator and act on results (fail/success)
 *
 * @param {string} requestId           - unique page/module id to track in global async reducer
 * @param {generator} fetchGenerator   - generator to call when ready to fetch resources
 * @param {string} [parentId]          - unique page/module id to wait for before starting calls
 * @param {function} [resolveSelector] - selector function that must resolve to true before starting calls
 */
export function* callFetchSaga({ requestId, fetchGenerator, parentId, resolveSelector }) {
  const fetchRequestId = createRequestId(requestId);
  try {
    if (parentId) {
      // wait for parent
      yield call(waitForOther, createRequestId(parentId), resolveSelector);
    }
    // set page as 'loading'
    yield put(asyncRequest(fetchRequestId));
    // start fetch all
    yield call(fetchGenerator, fetchRequestId);
    // unset page as loading
    yield put(asyncSuccess(fetchRequestId));
  } catch (error) {
    yield put(asyncFail(error, fetchRequestId));
  }
}

export const createRequestId = (moduleId) => `${moduleId}/FETCH_ALL`;
