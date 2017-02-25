import request from '../request';

/**
 * Checks if the user already has a login token.
 * */
export const isLoggedIn = () => !!(localStorage.getItem('token'));

/**
 * Logs the current user out
 */
export const logout = () => (
  // request('/logout')
  //   .then(() => Promise.resolve({ response: true })
  //   .catch((error) => Promise.resolve({ error })));
  Promise.resolve({ error: new Error('failed') })
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
  if (isLoggedIn()) { return Promise.resolve(true); }

  return request('/login', {
    method: 'POST',
    body: JSON.stringify({ username, password, code }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then((response) => { // eslint-disable-line arrow-body-style
    // Save token to local storage
    // localStorage.setItem('token', response.token);
    return Promise.resolve({ response });
  })
  .catch((error) => Promise.resolve({ error }));
  // return Promise.resolve({ response: 'token123' });
};


export const register = (username, password) => (
  request('/register', {
    type: 'POST',
    data: JSON.stringify({ username, password })
  })
    .then(() => login(username, password))
    .catch((error) => Promise.resolve({ error }))
);
