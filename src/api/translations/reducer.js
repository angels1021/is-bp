/**
 * Reducer for the translations api
 */

import { fromJS } from 'immutable';
import DEFAULT_LOCALE from 'containers/App/constants';
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
      state.set('error', false);
      return state.set('pending', payload); // local, [modules]
    }
    case MESSAGES_FAIL: {
      const { error } = payload;
      state.set('error', error);
      return state.set('pending', false);
    }
    case MESSAGES_SUCCESS: {
      const { locale, response } = payload;
      response.forEach((found) => {
        const { module, page, messages } = found;
        state.mergeIn(['messages', locale, module, page], messages);
      });
      return state.set('pending', false);
    }
    default:
      return state;
  }
};

export default translationsReducer;
