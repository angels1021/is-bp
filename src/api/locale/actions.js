/**
 * Locale api actions
 */
import {
  CHANGE_LOCALE_REQUEST,
  CHANGE_LOCALE_SUCCESS,
  CHANGE_LOCALE_FAIL,
  CHANGE_LOCALE_CANCEL
} from './constants';

/**
 * changeLocale - action creator
 *
 * @param {string} locale - two character language code, ie 'en'.
 * @param {object[]} request - request translations for the modules specified - passed to api/translations.
 * @property {string} request[].module - ie 'app'.
 * @property {string} request[].page ie  -'common'.
 * @param {string} moduleId - the caller module who's reducer should catch this actions
 */
export const changeLocale = (locale, request, moduleId) => ({
  type: CHANGE_LOCALE_REQUEST,
  payload: { locale, request, moduleId }
});

/**
 * changeLocaleSuccess - action creator
 *
 * @param {string} locale - two character language code, ie 'en'.
 * @param {string} moduleId - the caller module who's reducer should catch this actions
 */
export const changeLocaleSuccess = (locale, moduleId) => ({
  type: CHANGE_LOCALE_SUCCESS,
  payload: { locale, moduleId }
});

/**
 * changeLocaleFail - action creator
 *
 * @param {object} error - the response error
 * @param {string} moduleId - the caller module who's reducer should catch this actions
 */
export const changeLocaleFail = (error, moduleId) => ({
  type: CHANGE_LOCALE_FAIL,
  payload: { error, moduleId }
});

/**
 * changeLocaleCancel - action creator
 *
 * @param {string} moduleId - the caller module who's reducer should catch this actions
 */
export const changeLocaleCancel = (moduleId) => ({
  type: CHANGE_LOCALE_CANCEL,
  payload: { moduleId }
});

