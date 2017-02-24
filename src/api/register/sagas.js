/*
* Register Sagas
* */

import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { sendingRequest, requestError, changeForm } from './actions';
import { register } from '../../utils/auth';
import {
  REGISTER_REQUEST,
  cleanForm
} from './constants';

// register call
export function* callAuthorize({ username, password }) {
  // set as busy
  yield put(sendingRequest(true));
  // either error or response will be returned.
  const { response, error } = yield call(register, { username, password });

  // if we got an error back -  notify
  if (error) {
    yield put(requestError(error));
  }

  // set as idle
  yield put(sendingRequest(false));

  // if we got a response return it
  return response || false;
}

// register watcher
export function* registerWatcher() {
  // this saga is always watching for REGISTER_REQUEST action
  const request = yield take(REGISTER_REQUEST);
  const { username, password } = request.data;

  const wasSuccessful = yield call(callAuthorize, { username, password });

  if (wasSuccessful) {
    yield put(changeForm({ ...cleanForm }));
    yield put(push('/confirmRegistration'));
  }
}

// run saga
export function* registerFlow() {
  const watcher = yield fork(registerWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  registerFlow
];
