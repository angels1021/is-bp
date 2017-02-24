/*

* LoginReducers
*
* */

import { fromJS } from 'immutable';
import {
  CHANGE_FORM,
  SENDING_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR,
  cleanForm
} from './constants';

const registerInitialState = fromJS({
  form: { ...cleanForm },
  error: false,
  busy: false
});

const registerReducer = (state = registerInitialState, action) => {
  switch (action.type) {
    case CHANGE_FORM:
      return state.mergeIn(['form'], { ...cleanForm, ...action.newFormState });

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

export default registerReducer;
