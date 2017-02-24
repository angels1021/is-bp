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
import {
  LOAD_PRODUCTS,
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_ERROR
} from '../../../api/user/constants';

const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    products: false
  }
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'products'], false);

    case LOAD_PRODUCTS_SUCCESS:
      return state
        .setIn(['userData', 'products'], action.products)
        .set('loading', false)
        .set('currentUser', action.username);

    case LOAD_PRODUCTS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);

    default:
      return state;
  }
};

export default appReducer;
