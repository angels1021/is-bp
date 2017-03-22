/*
 *
 * LoginReducers
 *
 * */
import { fromJS } from 'immutable';
import { isLoggedIn } from 'utils/auth';
import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_SET
} from './constants';

export const initialStateJS = {
  user: {},
  error: false,
  pending: false,
  isLoggedIn: isLoggedIn()
};

const loginInitialState = fromJS(initialStateJS);

const authReducer = (state = loginInitialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS: {
      const { payload } = action;
      return state
        .set('error', false)
        .set('pending', false)
        .mergeIn(['user'], payload);
    }
    case AUTH_REQUEST: {
      return state
        .set('error', false)
        .set('pending', action.payload);
    }

    case AUTH_ERROR: {
      return state
        .set('pending', false)
        .set('error', action.payload);
    }

    case AUTH_SET: {
      const { payload } = action;
      return state.set('isLoggedIn', payload);
    }

    default:
      return state;
  }
};

export default authReducer;
