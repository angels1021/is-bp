/*
*
* LoginReducers
*
* */

import { fromJS } from 'immutable';
import { isLoggedIn } from '../../utils/auth';
import {
  CHANGE_FORM,
  SET_AUTH,
  SENDING_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR,
  cleanForm
} from './constants';

export const initialStateJS = {
  form: { ...cleanForm },
  error: false,
  busy: false,
  isLoggedIn: isLoggedIn()
};

const loginInitialState = fromJS(initialStateJS);

const loginReducer = (state = loginInitialState, action) => {
  switch (action.type) {
    case CHANGE_FORM:
      return state.mergeIn(['form'], action.newFormState);

    case SET_AUTH:
      return state.set('isLoggedIn', action.newAuthState);

    case SENDING_REQUEST:
      return state.set('busy', action.busy);

    case REQUEST_ERROR:
      return state.set('error', action.error);

    case CLEAR_ERROR:
      return state.set('error', false);

    default:
      return state;
  }
};

export default loginReducer;
