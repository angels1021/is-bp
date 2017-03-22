/**
 * logout saga.
 */
import { push } from 'react-router-redux';
import { take, call, put } from 'redux-saga/effects';
import { logout, clearLoggedIn } from 'utils/auth';
import { authRequest, authSuccess, authSet } from './actions';
import {
  LOGOUT_REQUEST
} from './constants';

// logout call
export function* callLogout(userId) {
  // set as busy
  yield put(authRequest(LOGOUT_REQUEST));

  // optimistic logout - set all to logged out regardless of call success
  yield [
    call(clearLoggedIn),
    put(authSuccess()),
    put(authSet(false))
  ];

  yield put(push('/login'));

  const { response } = yield call(logout, userId);

  // if (error) {
  //   // maybe send error to us?
  //   // irrelevant to user.
  // }

  // if successful return the response
  return response || false;
}

// logout watch
export function* logoutWatcher() {
  // this saga is always watching for LOGOUT action
  while (true) { // eslint-disable-line no-constant-condition
    const { payload } = yield take(LOGOUT_REQUEST);
    yield call(callLogout, payload);
  }
}

export const NAME = 'api/auth/sagas.logout';

export default logoutWatcher;
