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

const initialState = fromJS({
  loading: false,
  error: false
});

const asyncReducer = (state = initialState, action) => state; // eslint-disable-line no-unused-vars

export default combineReducers({
  async: asyncReducer,
  translations: translationsReducer
});
