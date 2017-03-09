/**
 * Auth fetchAll saga
 */

import { put, fork, call } from 'redux-saga/effects';
import { getModuleLocale } from 'api';
import { DEFAULT_LOCALE } from 'common/containers/App/constants';
import { changeLocaleSuccess, changeLocaleFail } from 'api/locale/actions';
import { fetchMessages } from 'api/fetchAll/utils';
import { PAGE, MODULE } from './auth.messages';

// act
// fork calling load for each resource so they are simultaneous.
export function* AuthFetch() {
  // prep messages
  const { response, error } = yield call(getModuleLocale, MODULE);

  let locale = DEFAULT_LOCALE;
  if (error) {
    yield put(changeLocaleFail(error, MODULE));
    // don't throw error, default to DEFAULT_LOCALE;
  } else if (response) {
    locale = response;
    yield put(changeLocaleSuccess(locale, MODULE));
  }
  const messageRequest = [{ module: 'app', page: 'common' }, { module: MODULE, page: PAGE }];
  // call messages
  // all fetchResource calls should be forked, so they will run in parallel
  // each fetchResource saga call can throw the saga
  yield fork(fetchMessages, () => locale, messageRequest);
}

// options to pass to api/fetchAll
export const fetchOptions = {
  requestId: `${MODULE}Module`,
  fetchGenerator: AuthFetch
};
