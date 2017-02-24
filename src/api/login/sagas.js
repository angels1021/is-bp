/*
* LoginSagas
* */

import { push } from 'react-router-redux';
import { take, call, put, fork, race } from 'redux-saga/effects';
import { sendingRequest, setAuth, requestError, changeForm } from './actions';
import { logout, login } from '../../utils/auth';
import {
  LOGIN_REQUEST,
  LOGOUT,
  cleanForm
} from './constants';

// logout call
export function* callLogout() {
  // set as busy
  yield put(sendingRequest(true));

  const { response, error } = yield call(logout);

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
      yield put(changeForm({ ...cleanForm }));
      yield put(push(location));
    } else if (logoutCall) {
      yield put(setAuth(false));
      yield call(callLogout);
      yield put(push('/login'));
    }
  }
}

// logout watch
export function* logoutWatcher() {
  // this saga is always watching for LOGOUT action
  while (true) { // eslint-disable-line no-constant-condition
    yield take(LOGOUT);
    yield put(setAuth(false));
    yield call(callLogout);
    yield put(push('/login'));
  }
}

// run saga
function* loginFlow() {
  yield fork(loginWatcher);
  yield fork(logoutWatcher);
}

export default loginFlow;
