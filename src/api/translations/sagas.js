/**
 * translations sagas
 */
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { getLocale } from '../../api';
import { selectNewRequest } from './selectors';
import { messageSuccess, messagesError } from './actions';
import {
  MESSAGES_REQUEST
} from './constants';

// act
export function* getMessages(locale, request) {
  // call api
  const { response, error } = yield call(getLocale, locale, request);

  if (error) {
    yield put(messagesError(error));
    return false;
  } else if (response) {
    yield put(messageSuccess(locale, response));
    return true;
  }
  const notFound = new Error(`no translations found for ${locale} and ${JSON.stringify(request)}`);
  yield put(messagesError(notFound));
  return false;
}

// caller
export function* callGetMassages(payload) {
  // check exists
  const newRequests = yield select(selectNewRequest);
  if (newRequests && newRequests.length) {
    // if one or more pages don't exist call saga
    yield call(getMessages, payload.locale, newRequests);
  } else {
    // translations already exist,  complete saga.
    yield put(messageSuccess([]));
  }
}

// watcher
export function* watchMessagesFlow() {
  // any additional calls to MESSAGES_REQUEST will cancel an already running saga.
  // ie: user changed locale then changed again before api responded
  yield takeLatest(MESSAGES_REQUEST, callGetMassages);
}

export const NAME = 'api/translations/sagas';

export default watchMessagesFlow;
