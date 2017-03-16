/**
 * auth saga constants.
 */

export const LOGIN_REQUEST = 'api/auth/LOGIN_REQUEST';
export const LOGOUT_REQUEST = 'api/auth/LOGOUT_REQUEST';
export const AUTH_REQUEST = 'api/auth/AUTH_REQUEST';
export const AUTH_ERROR = 'api/auth/AUTH_ERROR';
export const AUTH_SUCCESS = 'api/auth/AUTH_SUCCESS';
export const AUTH_SET = 'api/auth/AUTH_SET';

export const initialState = {
  username: '',
  password: '',
  location: '/',
  code: ''
};
