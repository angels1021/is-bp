/*
*
* LoginReducers
*
* */

import { fromJS } from 'immutable';
import { isLoggedIn } from '../../utils/auth';
import {
  SET_AUTH,
  REQUEST_PENDING,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REQUEST_ERROR,
  CLEAR_ERROR,
  initialState
} from './constants';

export const initialStateJS = {
  user: {},
  error: false,
  pending: false,
  isLoggedIn: isLoggedIn()
};

const loginInitialState = fromJS(initialStateJS);

const loginReducer = (state = loginInitialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return state.set('isLoggedIn', action.newAuthState);

    case LOGIN_SUCCESS:
    case LOGOUT_SUCCESS:
      return state.mergeIn(['user'], action.user);
    case REQUEST_PENDING:
      return state.set('pending', action.pending);

    case REQUEST_ERROR:
      return state.set('error', action.error);

    case CLEAR_ERROR:
      return state.set('error', false);

    default:
      return state;
  }
};

export const loginFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      state.get('fields').forEach((field) => {
        field.set('undefined');
      });
      return state.mergeIn(['values'], initialState);

    default:
      return state;
  }
};

export default loginReducer;
