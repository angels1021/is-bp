/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form/immutable';

import globalReducer from 'common/containers/App/reducer';
import authReducer from 'api/auth/reducer';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  locationBeforeTransitions: null
});

/**
 * Merge route into the global application state
 */
const routeReducer = (state = routeInitialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload
      });

    default:
      return state;
  }
};

/**
 * Creates the main reducer with the asynchronously loaded ones
 * this will be called with every lazy-loaded reducers.
 */
const createReducer = (asyncReducers) => combineReducers({
  route: routeReducer,
  global: globalReducer,
  form: formReducer,
  auth: authReducer,
  ...asyncReducers
});

export default createReducer;
