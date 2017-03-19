/**
 * Global action creators
 *
 * here will setup action creators to be used by the global reducer
 * and common actions that apply to any component
 */
import { createAction } from 'redux-actions';
import { ASYNC_REQUEST, ASYNC_SUCCESS, ASYNC_FAIL } from './constants';
const noop = () => {};
/**
 * action creator for ASYNC_REQUEST
 * called to start tracking an async call on the global object
 *
 * @example asyncRequest('someModule')
 *
 * @param  {string} id - a unique request id to track
 */
export const asyncRequest = createAction(ASYNC_REQUEST, noop, (id) => ({ id })); // (id) => id

/**
 * action creator for ASYNC_SUCCESS
 * called to complete tracking an async call and remove from global.loading list
 *
 * @example asyncSuccess('someModule')
 *
 * @param  {string} id - the unique request id used in asyncRequest
 */
export const asyncSuccess = createAction(ASYNC_SUCCESS, noop, (id) => ({ id })); // (id) => id

/**
 * action creator for ASYNC_FAIL
 * called to complete tracking an async call and set an error in global.errors list
 *
 * @example asyncFail(new Error('error'), 'someModule')
 *
 * @param {object} error - a new Error object to set as the request error
 * @param {string} id    - the unique request id used in asyncRequest
 *
 */
export const asyncFail = createAction(ASYNC_FAIL, (error) => (error), (error, id) => ({ id }));
