/**
 * fetchAll sagas
 *
 * most pages and modules have the same saga structure for fetching resources.
 * use this to start a component's fetch all saga
 */

import { takeEvery, takeLatest, fork, call, take, put, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { asyncSuccess, asyncFail, asyncRequest } from 'common/containers/App/actions';
import { invariant } from 'utils/invariant';
import { waitForOther } from './utils';
import { FETCH_ALL } from './constants';

/**
 * call specified fetchGenerator and act on results (fail/success)
 *
 * @param {string} requestId           - unique page/module id to track in global async reducer
 * @param {generator} fetchGenerator   - generator to call when ready to fetch resources
 * @param {string} [parentId]          - unique page/module id to wait for before starting calls
 * @param {function} [resolveSelector] - selector function that must resolve to true before starting calls
 */
export function* callFetchSaga({ requestId, fetchGenerator, parentId, resolveSelector }) {
  try {
    if (parentId) {
      // wait for parent
      yield call(waitForOther, parentId, resolveSelector);
    }
    // set page as 'loading'
    yield put(asyncRequest(requestId));
    // start fetch all
    yield call(fetchGenerator, requestId);
    // unset page as loading
    yield put(asyncSuccess(requestId));
  } catch (error) {
    yield put(asyncFail(requestId, error));
  }
}


/**
 *
 * watch for specified requestId
 *
 * @param {object} options - @see fetchFlowFactory
 */
export function* watchFetchSaga(options) {
  const { requestId } = options;
  // listen for 'requestId/FETCH_ALL' events
  yield fork(takeLatest, requestId, callFetchSaga, options);
}

/**
 * most pages will have the same init fetchAll saga
 * this flow will generate a watcher according to page options
 *
 * @param {object} payload
 * @param {string} payload.requestId           - unique page/module id to track in global async reducer
 * @param {generator} payload.fetchGenerator   - generator to call when ready to fetch resources
 * @param {string} [payload.parentId]          - unique page/module id to wait for before starting calls
 * @param {function} [payload.resolveSelector] - selector function that must resolve to true before starting calls
 * @returns {generator} sagaFlow
 */
export function* fetchFlow({ payload }) {
  invariant(
    (payload && payload.requestId && payload.fetchGenerator),
    'api/fetchAll/sagas fetchFlowFactory options requestId and fetchGenerator are required'
  );
  // Fork watcher so we can continue execution
  const watcher = yield fork(watchFetchSaga, payload);
  // call request once - we set a watcher instead of just calling callFetchSaga
  // to allow for an external retry
  yield put({ type: payload.requestId });

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export const NAME = 'api/fetchAll/saga';

export function* fetchWatcher() {
  // watch for any FETCH_ALL event
  yield fork(takeEvery, FETCH_ALL, fetchFlow);
}

export default fetchWatcher;
