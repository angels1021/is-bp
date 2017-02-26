import { post, put, get } from '../request';

/**
 * Checks if the user already has a login token.
 * */
export const isLoggedIn = () => !!(localStorage.getItem('token'));

/**
 * Logs the current user out
 */
export const logout = (userId) => (
  post('/logout', {
    data: { userId }
  })
    .then((response) => {
      localStorage.removeItem('token', response.token);
      return Promise.resolve({ response });
    })
    .catch((error) => Promise.resolve({ error }))
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
export const login = (username, password, code = '') => { // eslint-disable-line no-unused-vars
  if (isLoggedIn()) {
    const token = localStorage.getItem('token');
    return get(`/users?token=${token}`)
      .then((users) => {
        const user = users && users[0];
        if (user) {
          return { response: user };
        }
        localStorage.removeItem('token');
        return ({ error: new Error('user token was not found') });
      });
  }

  return post('/login', {
    data: { username, password, code }
  })
  .then((response) => { // eslint-disable-line arrow-body-style
    // Save token to local storage
    if (!response) {
      return Promise.resolve({ error: false });
    }
    localStorage.setItem('token', response.token);
    return ({ response });
  })
  .catch(() => ({ error: false }));
  // return Promise.resolve({ response: 'token123' });
};


export const register = (username, password) => (
  put('/register', {
    data: { username, password }
  })
    .then(() => login(username, password))
    .catch((error) => Promise.resolve({ error }))
);
