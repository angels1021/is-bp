/**
 * logout saga.
 */
import { push } from 'react-router-redux';
import { take, call, put } from 'redux-saga/effects';
import { logout, clearLoggedIn } from 'utils/auth';
import { authRequest, authError, authSuccess, authSet } from './actions';
import {
  LOGOUT_REQUEST
} from './constants';

// logout call
export function* callLogout(userId) {
  // set as busy
  yield put(authRequest(LOGOUT_REQUEST));

  const { response, error } = yield call(logout, userId);

  // notify on error
  if (error) {
    yield put(authError(error));
  }

  // set as idle - since success was optimistic, we'll need to reset pending state manually
  yield put(authRequest(false));

  // if successful return the response
  return response || false;
}

// logout watch
export function* logoutWatcher() {
  // this saga is always watching for LOGOUT action
  while (true) { // eslint-disable-line no-constant-condition
    const { userId } = yield take(LOGOUT_REQUEST);
    yield call(clearLoggedIn);
    yield put(authSuccess());
    yield put(authSet(false));
    yield put(push('/login'));
    // optimistic logout - set all to logged out regardless of call success
    yield call(callLogout, userId);
  }
}

export const NAME = 'api/auth/sagas.logout';

export default logoutWatcher;
