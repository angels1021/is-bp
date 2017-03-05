import { userLlogin, userLogout, userRegister, getUsers } from '../../api';

/**
 * Checks if the user already has a login token.
 * */
export const isLoggedIn = () => !!(localStorage.getItem('token'));

/**
 * Logs the current user out
 */
export const logout = (userId) => (
  userLogout(userId)
    .then((res) => {
      const { response } = res;
      if (response) {
        localStorage.removeItem('token', response.token);
      }
      return res;
    })
);

/**
 * logs a user In, returning a promise with `true` when done.
 *
 * @param {string} username - the entered user name
 * @param {string} password - the entered password
 * @param {string} code - the user card swipe code (optional)
 *
 * @return {promise}
 */
export const login = ({ username, password, code = '' }) => { // eslint-disable-line no-unused-vars
  if (isLoggedIn()) {
    const token = localStorage.getItem('token');
    return getUsers({ token })
      .then((res) => {
        const { response } = res;
        const user = response && response[0];
        if (user) {
          return { response: user };
        }
        localStorage.removeItem('token');
        return ({ error: new Error('user token was not found') });
      });
  }

  return userLlogin({ username, password, code })
    .then((res) => {
      const { response } = res;
      // Save token to local storage
      if (!response) {
        return { error: false };
      }
      localStorage.setItem('token', response.token);
      return res;
    });
};


export const register = (username, password) => (
  userRegister({ username, password })
    .then(({ response, error }) => (response ? login(username, password) : error))
    .catch((error) => Promise.resolve({ error }))
);
