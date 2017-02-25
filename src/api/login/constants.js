/*
 *  Login/Logout Sagas constants
 *
 * */

export const CHANGE_FORM = 'api/login/CHANGE_FORM';
export const SET_AUTH = 'api/login/SET_AUTH';
export const REQUEST_PENDING = 'api/login/REQUEST_PENDING';
export const LOGIN_REQUEST = 'api/login/LOGIN_REQUEST';
export const LOGOUT = 'api/login/LOGOUT';
export const REQUEST_SUCCESS = 'api/login/REQUEST_SUCCESS';
export const REQUEST_ERROR = 'api/login/REQUEST_ERROR';
export const CLEAR_ERROR = 'api/login/CLEAR_ERROR';

export const initialState = {
  username: '',
  password: '',
  location: '/',
  code: ''
};
