/*
 *  Login/Logout Sagas
 * */

import { push } from 'react-router-redux';
import { takeLatest, take, call, put, fork, race } from 'redux-saga/effects';
import { login, setLoggedIn } from 'utils/auth';
import { authRequest, authError, authSuccess, authSet } from './actions';
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST
} from './constants';

// login call
export function* callAuthorize({ username, password, code }) {
  // set as busy
  yield put(authRequest(LOGIN_REQUEST));
  // attempt to login
  const { response, error } = yield call(login, { username, password, code });
  // notify on error
  if (error) {
  // notify us of error but show plain error to user
    return false;
  }

  return response || false;
}

export function* callLogin({ payload }) {
  const { username, password, location, code } = payload;
  // if LOGOUT action is dispatched, cancel login, logout instead
  const { auth, logoutCall } = yield race({
    auth: call(callAuthorize, { username, password, code }),
    logoutCall: take(LOGOUT_REQUEST)
  });

  // if auth === response - login
  // if auth === false - fail
  // if logout won - logout.

  if (auth) {
    const { user, token } = auth;
    yield put(authSuccess(user));
    yield call(setLoggedIn, token);
    yield put(authSet(true));
    yield put(push(location));
  } else if (!logoutCall) {
    yield put(authError(new Error('password or username are wrong')));
    yield put(authSet(false));
  }
}

// login watch
export function* loginWatcher() {
  // this saga is watching for LOGIN_REQUEST action
  yield fork(takeLatest, LOGIN_REQUEST, callLogin);
}

export const NAME = 'api/auth/sagas.login';

export default [loginWatcher];
