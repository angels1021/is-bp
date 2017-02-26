/*
* LoginSagas
* */

// plan
// check if has token and user
// get user
// set user
// set token
// setAuth

import { push } from 'react-router-redux';
import { take, call, put, fork, race } from 'redux-saga/effects';
import { logout, login } from '../../api';
import { sendingRequest, setAuth, requestError, loginSuccess, logoutSuccess } from './actions';
import {
  LOGIN_REQUEST,
  LOGOUT
} from './constants';

// logout call
export function* callLogout(userId) {
  // set as busy
  yield put(sendingRequest(true));

  const { response, error } = yield call(logout, userId);

  // notify on error
  if (error) {
    yield put(requestError(error));
  }

  // set as idle
  yield put(sendingRequest(false));

  // if successful return the response
  return response || false;
}

// login call
export function* callAuthorize({ username, password, code }) {
  // set as busy
  yield put(sendingRequest(true));
  // attempt to login
  const { response, error } = yield call(login, { username, password, code });

  // notify on error
  if (error) {
    yield put(requestError(error));
    yield put(setAuth(false));
  }

  // set as idle
  yield put(sendingRequest(false));

  return response || false;
}

// login watch
export function* loginWatcher() {
  // this saga is always watching for LOGIN_REQUEST action
  while (true) { // eslint-disable-line no-constant-condition
    const { data } = yield take(LOGIN_REQUEST);
    const { username, password, location, code } = data;

    // if LOGOUT action is dispatched, cancel login, logout instead
    const { auth, logoutCall } = yield race({
      auth: call(callAuthorize, { username, password, code }),
      logoutCall: take(LOGOUT)
    });

    // if auth === response - login
    // if auth === false - ignore
    // if logout won - logout.

    if (auth) {
      yield put(setAuth(true));
      yield put(loginSuccess(auth));
      yield put(push(location));
    } else if (logoutCall) {
      yield put(setAuth(false));
      yield put(logoutSuccess());
      yield put(push('/login'));
      yield call(callLogout, logoutCall.userId);
    }
  }
}

// logout watch
export function* logoutWatcher() {
  // this saga is always watching for LOGOUT action
  while (true) { // eslint-disable-line no-constant-condition
    const { userId } = yield take(LOGOUT);
    yield put(setAuth(false));
    yield put(logoutSuccess());
    yield put(push('/login'));
    // optimistic logout - set all to logged out regardless of call success
    yield call(callLogout, userId);
  }
}

// run saga
function* loginFlow() {
  yield fork(loginWatcher);
  yield fork(logoutWatcher);
}

export default loginFlow;
