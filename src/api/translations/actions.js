/**
 * action creators for the translations api.
 */

import {
  MESSAGES_REQUEST,
  MESSAGES_SUCCESS,
  MESSAGES_FAIL
} from './constants';

/**
 * requestMessages - action creator
 * dispatch to request translations for each module
 *
 * @param {string} locale - two character language code, ie 'en'.
 * @param {object[]} request - request translations for the modules specified.
 * @property {string} request[].module - ie 'app'.
 * @property {string} request[].page ie  -'common'.
 */
export const requestMessages = (locale, request) => ({
  type: MESSAGES_REQUEST,
  payload: { locale, request }
});

/**
 * messageSuccess - action creator
 * dispatch to add received translations to state
 *
 * @param {string} locale - two character language code, ie 'en'.
 * @param {object[]} response - found translations for the modules requested.
 * @property {string} response[].module - ie 'app'.
 * @property {string} response[].page ie  -'common'.
 * @property {object} response[].messages ie  - the translation messages found
 */
export const messageSuccess = (locale, response) => ({
  type: MESSAGES_SUCCESS,
  payload: { locale, response }
});

/**
 * messagesError - action creator
 * dispatch if requestMessages was rejected
 *
 * @param {object} error - the response error
 */
export const messagesError = (error) => ({
  type: MESSAGES_FAIL,
  payload: { error }
});
