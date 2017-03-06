/**
 * Auth fetchAll saga
 */
import { delay } from 'redux-saga';
import { take, takeLatest, put, fork, call, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { getModuleLocale } from 'api';
import { FETCH_ALL, DEFAULT_LOCALE } from 'common/containers/App/constants';
import { asyncRequest, asyncSuccess, asyncFail } from 'common/containers/App/actions';
import { requestMessages } from 'api/translations/actions';
import { MESSAGES_SUCCESS, MESSAGES_FAIL } from 'api/translations/constants';
import { changeLocaleSuccess, changeLocaleFail } from 'api/locale/actions';
import { fetchResource } from 'utils/initGenerators';
import { PAGE, MODULE } from './auth.messages';

const requestId = FETCH_ALL(`${MODULE}Module`);

// act
// fork calling load for each resource so they are simultaneous.
function* AuthFetch() {
  // set page as 'loading'
  yield put(asyncRequest(requestId));
  // prep messages
  const { response, error } = yield call(getModuleLocale, MODULE);
  yield call(delay, 1000);
  let locale = DEFAULT_LOCALE;
  if (error) {
    yield put(changeLocaleFail(error, MODULE));
  } else if (response) {
    locale = response;
    yield put(changeLocaleSuccess(locale, MODULE));
  }
  const messageRequest = [{ module: 'app', page: 'common' }, { module: MODULE, page: PAGE }];
  // call messages
  yield fork(
    fetchResource,
    requestMessages(locale, messageRequest),
    MESSAGES_SUCCESS,
    MESSAGES_FAIL
  );
}

// call
function* callAuthFetch() {
  try {
    // start fetch all
    yield call(AuthFetch);
    // unset page as loading
    yield put(asyncSuccess(requestId));
  } catch (error) {
    // set page as 'with error'
    yield put(asyncFail(requestId, error));
  }
}

// watch
function* authModuleWatcher() {
  // listen for 'FETCH_ALL' events
  yield takeLatest(requestId, callAuthFetch);
}

export function* authModuleFlow() {
  // Fork watcher so we can continue execution
  const watcher = yield call(authModuleWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  authModuleFlow
];
