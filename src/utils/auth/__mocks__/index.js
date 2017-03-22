/**
 * mock function for the Auth utils.
 */
import { delay } from 'lodash-es';
export const login = jest.fn(() =>
  new Promise((resolve) =>
    delay(resolve, 300, {
      response: {
        user: { id: 'tom' },
        token: 'doug'
      }
    })
  )
);
export const logout = jest.fn(() =>
  new Promise((resolve) =>
    delay(resolve, 300, { response: true })
  )
);

export const setLoggedIn = jest.fn();
export const clearLoggedIn = jest.fn();
export const isLoggedIn = jest.fn(() => false);
