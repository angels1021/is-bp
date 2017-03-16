/**
 * Login page sagas
 */
import { fork } from 'redux-saga/effects';
import loginSagas, { NAME } from 'api/auth/sagas.login';
import { fetchMessages } from 'api/fetchAll/utils';
import { PAGE, MODULE } from './login.messages';
import { selectLocale, selectAuth } from '../../selectors';

// act
// fork calling load for each resource so they are simultaneous.
export function* loginFetch() {
  // prep messages
  const messageRequest = [{ module: MODULE, page: PAGE }];
  // call messages
  yield fork(fetchMessages, selectLocale(), messageRequest);
}

// options to pass to api/fetchAll
export const fetchOptions = {
  requestId: `${PAGE}Page`,
  fetchGenerator: loginFetch,
  parentId: `${MODULE}Module`,
  resolveSelector: selectAuth()
};

export const inject = [
  [NAME, loginSagas]
];
