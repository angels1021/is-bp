/**
 * Login page sagas
 */
import { take, takeLatest, put, fork, select, call, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { FETCH_ALL } from 'common/containers/App/constants';
import { asyncRequest, asyncSuccess, asyncFail } from 'common/containers/App/actions';
import { requestMessages } from 'api/translations/actions';
import { MESSAGES_SUCCESS, MESSAGES_FAIL } from 'api/translations/constants';
import { fetchResource, waitForOther } from 'utils/initGenerators';
import { PAGE, MODULE } from './login.messages';
import { selectLocale } from '../../selectors';

const requestId = FETCH_ALL(`${PAGE}Page`);
const parentId = FETCH_ALL(`${MODULE}Module`);

// act
// fork calling load for each resource so they are simultaneous.
function* LoginFetch() {
  // set page as 'loading'
  yield put(asyncRequest(requestId));
  // prep messages
  const locale = yield select(selectLocale());
  const messageRequest = [{ module: MODULE, page: PAGE }];
  // call messages
  yield fork(
    fetchResource,
    requestMessages(locale, messageRequest),
    MESSAGES_SUCCESS,
    MESSAGES_FAIL
  );
}

// call
function* callLoginFetch() {
  try {
    // wait for parent
    yield waitForOther(parentId);
    // start fetch all
    yield call(LoginFetch);
    // unset page as loading
    yield put(asyncSuccess(requestId));
  } catch (error) {
    // set page as 'with error'
    yield put(asyncFail(requestId, error));
  }
}


// watch
function* loginPageWatcher() {
  // listen for 'FETCH_ALL' events
  yield fork(takeLatest, requestId, callLoginFetch);
}

export function* loginPageFlow() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(loginPageWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  loginPageFlow
];
