/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import translationsReducer from 'api/translations/reducer';
import { ASYNC_REQUEST, ASYNC_SUCCESS, ASYNC_FAIL } from './constants';

const deleteInList = (list, value) => list.filter((item) => item !== value);

const initialState = fromJS({
  loading: [],
  errors: {}
});

// track async requests across the app
export const asyncReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case ASYNC_REQUEST: {
      const { payload: id } = action;
      return state.deleteIn(['errors', id]).mergeIn(['loading'], [id]);
    }
    case ASYNC_SUCCESS: {
      const { payload: id } = action;
      return state.deleteIn(['errors', id]).set('loading', deleteInList(state.get('loading'), id));
    }
    case ASYNC_FAIL: {
      const { id, error } = action.payload;
      return state.setIn(['errors', id], error).set('loading', deleteInList(state.get('loading'), id));
    }
    default:
      return state;
  }
};

export default combineReducers({
  async: asyncReducer,
  translations: translationsReducer
});
