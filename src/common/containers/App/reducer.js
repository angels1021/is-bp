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

const initialState = fromJS({
  loading: [],
  errors: {}
});

// track async requests across the app
export const asyncReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ASYNC_REQUEST: {
      const { id } = payload;
      return state.deleteIn(['errors', id]).mergeIn(['loading'], [id]);
    }
    case ASYNC_SUCCESS: {
      const { id } = payload;
      const newLoading = state.get('loading').filter((item) => item !== id);
      return state.deleteIn(['errors', id]).set('loading', newLoading);
    }
    case ASYNC_FAIL: {
      const { id, error } = payload;
      return state.deleteIn(['loading', id]).setIn(['errors', id], error);
    }
    default:
      return state;
  }
};

export default combineReducers({
  async: asyncReducer,
  translations: translationsReducer
});
