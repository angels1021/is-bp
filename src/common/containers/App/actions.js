/**
 * Global action creators
 *
 * here will setup action creators to be used by the global reducer
 * and common actions that apply to any component
 */
import { ASYNC_REQUEST, ASYNC_SUCCESS, ASYNC_FAIL } from './constants';

/**
 * action creator for ASYNC_REQUEST
 * called to start tracking an async call on the global object
 *
 * @param  {string} id - a unique request id to track
 */
export const asyncRequest = (id) => ({
  type: ASYNC_REQUEST,
  payload: { id }
});

/**
 * action creator for ASYNC_SUCCESS
 * called to complete tracking an async call and remove from global.loading list
 *
 * @param  {string} id - the unique request id used in asyncRequest
 */
export const asyncSuccess = (id) => ({
  type: ASYNC_SUCCESS,
  payload: { id }
});

/**
 * action creator for ASYNC_FAIL
 * called to complete tracking an async call and set an error in global.errors list
 *
 * @param {string} id    - the unique request id used in asyncRequest
 * @param {object} error - a new Error object to set as the request error
 */
export const asyncFail = (id, error) => ({
  type: ASYNC_FAIL,
  payload: { id, error }
});
