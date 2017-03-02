/**
 * Reducer for the translations api
 */

import { fromJS } from 'immutable';
import { DEFAULT_LOCALE } from 'common/containers/App/constants';
import {
  MESSAGES_REQUEST,
  MESSAGES_SUCCESS,
  MESSAGES_FAIL
} from './constants';

const initialMessages = {};
initialMessages[DEFAULT_LOCALE] = {
  app: {
    common: {}
  }
};

const initialState = fromJS({
  messages: initialMessages,
  error: false,
  pending: false
});

const translationsReducer = (state = initialState, action: {}) => {
  const { type, payload } = action;
  switch (type) {
    case MESSAGES_REQUEST: {
      return state
        .set('error', false)
        .set('pending', payload); // local, [modules]
    }
    case MESSAGES_FAIL: {
      const { error } = payload;
      return state
        .set('error', error)
        .set('pending', false);
    }
    case MESSAGES_SUCCESS: {
      const { locale, response } = payload;
      return response.reduce((newState, found) => {
        const { module, page, messages } = found;
        return newState.mergeIn(['messages', locale, module, page], messages);
      }, state)
        .set('pending', false);
    }
    default:
      return state;
  }
};

export default translationsReducer;
