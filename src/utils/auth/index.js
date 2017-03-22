import { userlogin, userLogout, userRegister, getUsers } from '../../api';

/**
 * Checks if the user already has a login token.
 * */
export const isLoggedIn = () => !!(localStorage.getItem('token'));

/**
 * Set the user login token.
 *
 * @param {string} token;
 * */
export const setLoggedIn = (token) => localStorage.setItem('token', token);

/**
 * Clear the user login token.
 * */
export const clearLoggedIn = () => localStorage.removeItem('token');

export const verifyLoggedIn = (token) => getUsers({ token })
  .then((res) => {
    const { response } = res;
    const user = response && response[0];
    if (user) {
      return { response: user };
    }
    // no user with the provided token was found
    clearLoggedIn();
    return ({ error: new Error('user token was not found') });
  });

/**
 * logs a user In, returning a promise with `true` when done.
 *
 * @param {object} formData - the login form values
 * @param {string} formData.username - the entered user name
 * @param {string} formData.password - the entered password
 * @param {string} [formData.code=''] - the user card swipe code (optional)
 *
 * @return {promise}
 */
export const login = (formData) => userlogin(formData);

/**
 * Logs the current user out
 *
 * @param {string} userId
 */
export const logout = (userId) => userLogout(userId);

export const register = (username, password) => (
  userRegister({ username, password })
    .then(({ response, error }) => (response ? login(username, password) : error))
    .catch((error) => Promise.resolve({ error }))
);
