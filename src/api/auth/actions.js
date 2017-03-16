/*
 * LoginActions
 *
 * redux actions to describe login/logout actions
 *
 * */
import { createAction } from 'redux-actions';
import { createFormAction } from 'redux-form-saga';
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_SET
} from './constants';

/**
 * Tells the app we want to login a user
 * @param  {object} formData          The formData we're sending for login
 * @param  {string} formData.username The username of the user to login
 * @param  {string} formData.password The password of the user to login
 * @param  {string} formData.location The location to navigate to after login
 * @param  {string} formData.code     The card code of the user to login (optional)
 *
 * @return {object} action object - { type: LOGIN_REQUEST, payload: formData{} }
 */
export const login = createAction(LOGIN_REQUEST, (formData) => formData.toObject()); // (formData) => formData

/**
 * Tells the app we want to log out a user
 *
 * @param {string/number} userId - the user to logout;
 *
 * @return {object} action object - { type: LOGOUT_REQUEST, payload: userId }
 */
export const logout = createAction(LOGOUT_REQUEST); // (userId) => userId

/**
 * Sets the 'error' state to error received (both login and logout use the same reducer)
 * @see http://redux-form.com/6.5.0/docs/api/SubmissionError.md/
 * for SubmissionError
 *
 * @param {object} Error/SubmissionError The error received when trying to make a request.
 *
 * @return {object} action object - { type: AUTH_ERROR, payload: error }
 */
export const authError = createAction(AUTH_ERROR); // (SubmissionError) => SubmissionError
// export const authError = (error) => ({
//   type: AUTH_ERROR,
//   payload: error
// }); // (error) => error

/**
 * Sets the 'pending' state to requested action (both login and logout use the same reducer)
 *
 * @param {string} type The action type making the request
 *
 * @return {object} action object - { type: AUTH_REQUEST, payload: LOGIN_REQUEST }
 */
export const authRequest = createAction(AUTH_REQUEST); // (type) => type

/**
 * Sets the 'user' state to requested response (both login and logout use the same reducer)
 *
 * @param {object} [user={}] The new user object to set. on logout it's unnecessary
 * @param {string} user.id The user id
 * @param {string} user.uuid The user's uuid
 * @param {string} user.role The user's authorized role
 * @param {string} user.firstName The user's first name
 * @param {string} user.lastName The user's last name
 *
 * @return {object} action object - { type: AUTH_SUCCESS, payload: user{} }
 */
export const authSuccess = createAction(AUTH_SUCCESS, (user) => user || {});

/**
 * Sets the authentication state of the application
 *
 * @param  {boolean} isLoggedIn
 */
export const authSet = createAction(AUTH_SET, (isLoggedIn) => Boolean(isLoggedIn));

export const loginAction = createFormAction(login, [AUTH_SUCCESS, AUTH_ERROR]);
