/*
* LoginActions
*
* redux actions to describe login/register actions
*
* */
import {
  SET_AUTH,
  REQUEST_PENDING,
  LOGIN_REQUEST,
  LOGOUT,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  CLEAR_ERROR
} from './constants';

/**
* requestSuccess - set the user received from login
*
* @param {type} user Description
* @param  {string} user.id The user id
* @param  {string} user.uuid The user's uuid
* @param  {string} user.role The user's authorized role
* @param  {string} user.firstName The user's first name
* @param  {string} user.lastName The user's last name
*
* @returns {type} Description
*/
export const requestSuccess = (user) => ({
  type: REQUEST_SUCCESS,
  user
});

/**
 * Sets the authentication state of the application
 *
 * @param  {boolean} newAuthState True means a user is logged in, false means no user is logged in
 */
export const setAuth = (newAuthState) => ({
  type: SET_AUTH,
  newAuthState: Boolean(newAuthState)
});

/**
 * Sets the `currentlySending` state, which displays a loading indicator during requests
 *
 * @param  {boolean} busy True means we're currently sending a request, False means we're idle
 */
export const sendingRequest = (pending) => ({
  type: REQUEST_PENDING,
  pending: Boolean(pending)
});

/**
 * Tells the app we want to login a user
 * @param  {object} data          The data we're sending for login
 * @param  {string} data.username The username of the user to login
 * @param  {string} data.password The password of the user to login
 * @param  {string} data.location The location to navigate to after login
 * @param  {string} data.code     The card code of the user to login (optional)
 */
export const loginRequest = (data) => ({
  type: LOGIN_REQUEST,
  data
});

/**
 * Tells the app we want to log out a user
 */
export const logoutRequest = () => ({
  type: LOGOUT
});


/**
 * Sets the 'error' state to error received
 *
 * @param {object} error The error received when trying to make arequest
 */
export const requestError = (error) => ({
  type: REQUEST_ERROR,
  error
});

/**
 * Sets the 'error' state as empty
 */
export const clearError = () => ({
  type: CLEAR_ERROR
});
