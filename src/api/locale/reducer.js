/*
 * Locale api reducer factory
 *
 * since all pages share the same language structure
 * we can use a factory to create their reducers
 */

import { fromJS } from 'immutable';
import { invariant } from 'utils/invariant';
import { DEFAULT_LOCALE } from 'common/containers/App/constants';
import {
  CHANGE_LOCALE_REQUEST,
  CHANGE_LOCALE_SUCCESS,
  CHANGE_LOCALE_FAIL,
  CHANGE_LOCALE_CANCEL
} from './constants';

/**
 * Factory function to create individual reducers for each module.
 * since each module can have it's own locale, they require separate reducers.
 * the reducer will only work for actions that include correct moduleId
 *
 * @param {string} moduleId - the moduleId to listen to for dispatched events
 * @returns {function(*=, *)} - redux reducer
 *
 */
export default function LocaleReducerFactory(moduleId) {
  // if moduleId param is undefined, the reducer should fail
  invariant(
    moduleId,
    'locale reducer must include moduleId argument'
  );

  const initialState = fromJS({
    locale: DEFAULT_LOCALE,
    pending: false,
    error: false
  });

  return (state = initialState, action) => {
    if (!action.payload || action.payload.moduleId !== moduleId) return state;
    const { type, payload } = action;
    switch (type) {
      case CHANGE_LOCALE_REQUEST: {
        const { locale } = payload;
        return state
          .set('error', false)
          .set('pending', locale);
      }
      case CHANGE_LOCALE_FAIL: {
        const { error } = payload;
        return state
          .set('error', error)
          .set('pending', false);
      }
      case CHANGE_LOCALE_SUCCESS: {
        const { locale } = payload;
        return state
          .set('error', false)
          .set('locale', locale)
          .set('pending', false);
      }
      case CHANGE_LOCALE_CANCEL: {
        return state
          .set('error', false)
          .set('pending', false);
      }
      default:
        return state;
    }
  };
}
