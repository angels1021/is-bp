/**
 * Generators that can be used in any page's init saga
 */
import { take, put, select, race } from 'redux-saga/effects';
import { ASYNC_SUCCESS } from 'common/containers/App/constants';
import { selectRequestLoading } from 'common/containers/App/selectors';

// helper
// fetch resources where their success/fail event are important to page load
// for resources where it doesn't matter, call fork(put, action) instead.
export function* fetchResource(action, takeSuccess, takeFail) {
  yield put(action);
  const { fail } = yield race({
    success: take(takeSuccess),
    fail: take(takeFail)
  });
  if (fail) {
    throw fail.payload.error;
  }
  return true;
}
// wait for another module or page to finish loading before moving on
export function* waitForOther(moduleId) {
  const selector = selectRequestLoading();
  let isLoading = yield select(selector);
  while (isLoading(moduleId)) {
    yield take(ASYNC_SUCCESS);
    isLoading = yield select(selector);
  }
}
