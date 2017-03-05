/**
 * Locale api sagas
 *
 * abstraction layer for api/translations.
 * to be used from main module routes on locale change to request messages
 */
import { takeLatest, take, fork, race, put, cancel } from 'redux-saga/effects';
import { warning } from 'utils/invariant';
import { requestMessages } from '../translations/actions';
import { MESSAGES_SUCCESS, MESSAGES_FAIL } from '../translations/constants';
import { changeLocaleSuccess, changeLocaleFail, changeLocaleCancel } from './actions';
import {
  CHANGE_LOCALE_REQUEST,
  CHANGE_LOCALE_CANCEL
} from './constants';

// act
export function* getLocale({ locale, request, moduleId }) {
  yield put(requestMessages({ locale, request }));
  const { success, fail } = yield race({
    success: take(MESSAGES_SUCCESS),
    fail: take(MESSAGES_FAIL)
  });
  if (fail) {
    // get messages failed
    yield put(changeLocaleFail(fail.error, moduleId));
  } else if (success && (success.locale === locale)) {
    // get messages success
    yield put(changeLocaleSuccess(locale, moduleId));
  } else {
    // messages received for wrong locale (possible uncanceled previous request)
    // don't set new locale but don't display error
    yield put(changeLocaleCancel(moduleId));
    // this shouldn't happen - warn
    warning(false, `locale messages response for module ${moduleId} is empty or is for wrong module`);
  }
}

// caller
export function* callGetLocale(payload) {
  // call getLocale - non blocking
  const task = yield fork(getLocale, payload);
  // if same module dispatched cancel event, cancel getLocale;
  const { payload: cancelPayload } = yield take(CHANGE_LOCALE_CANCEL);
  if (cancelPayload.moduleId === payload.moduleId) {
    yield cancel(task);
  }
}

// watcher
function* watchLocaleFlow() {
  // any additional calls to CHANGE_LOCALE_REQUEST will cancel an already running saga.
  // ie: user changed locale then changed again before api responded
  yield takeLatest(CHANGE_LOCALE_REQUEST, callGetLocale);
}

export const NAME = 'api/locale/sagas';

export default watchLocaleFlow;
