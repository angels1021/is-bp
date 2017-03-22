/**
 * Test API Auth actions
 */

import {
  login,
  logout,
  authRequest,
  authError,
  authSuccess,
  authSet
} from '../actions';
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_SET
} from '../constants';

describe('API Auth actions', () => {
  describe('login', () => {
    it('should return the correct type and contain the data object', () => {
      // arrange
      const expectedResult = {
        type: LOGIN_REQUEST,
        payload: {
          username: 'Tom',
          password: 'McFly',
          location: '/cr/1',
          code: ''
        }
      };
      // act
      const result = login({
        toObject: () => ({
          username: 'Tom',
          password: 'McFly',
          location: '/cr/1',
          code: ''
        })
      });
      // assert
      expect(result).toEqual(expectedResult);
    });
  });
  describe('logout', () => {
    it('should return the correct type, and userId as payload', () => {
      // arrange
      const expectedResult = {
        type: LOGOUT_REQUEST,
        payload: 1
      };
      // act
      const result = logout(1);
      // assert
      expect(result).toEqual(expectedResult);
    });
  });
  describe('authRequest', () => {
    it('should return the correct type and caller as payload', () => {
      // arrange
      const expectedResult = {
        type: AUTH_REQUEST,
        payload: 'ANY_REQUEST'
      };
      // act
      const result = authRequest('ANY_REQUEST');
      // assert
      expect(result).toEqual(expectedResult);
    });
  });
  describe('authSuccess', () => {
    it('should return the correct type and user as payload', () => {
      // arrange
      const expectedResult = {
        type: AUTH_SUCCESS,
        payload: {
          id: '1',
          firstName: 'tom'
        }
      };
      // act
      const result = authSuccess({
        id: '1',
        firstName: 'tom'
      });
      // assert
      expect(result).toEqual(expectedResult);
    });
    it('should default to empty object if user is falsey', () => {
      // arrange
      const expectedResult = {
        type: AUTH_SUCCESS,
        payload: {}
      };
      // act
      const result = authSuccess();
      // assert
      expect(result).toEqual(expectedResult);
    });
  });
  describe('authError', () => {
    it('should return the correct type, set as error and set Error as payload', () => {
      // arrange
      const err = new Error('boomerang');
      const expectedResult = {
        type: AUTH_ERROR,
        payload: err,
        error: true
      };
      // act
      const result = authError(err);
      // assert
      expect(result).toEqual(expectedResult);
    });
  });
  describe('authSet', () => {
    it('should return the correct type and payload: true for any truthy value', () => {
      // act
      let result = authSet(true);
      // assert
      expect(result.type).toBe(AUTH_SET);
      expect(result.payload).toBe(true);
      // act
      result = authSet(1);
      // assert
      expect(result.payload).toBe(true);
      // act
      result = authSet('false');
      // assert
      expect(result.payload).toBe(true);
    });

    it('should return payload: false for any falsey value', () => {
      // act
      let result = authSet(false);
      // assert
      expect(result.type).toBe(AUTH_SET);
      expect(result.payload).toBe(false);
      // act
      result = authSet(0);
      // assert
      expect(result.payload).toBe(false);
      // act
      result = authSet('');
      // assert
      expect(result.payload).toBe(false);
    });
  });
});
