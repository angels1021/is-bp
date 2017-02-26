/*
*
* Tests for login actions
*
* */
/*  */
import {
  REQUEST_SUCCESS,
  SET_AUTH,
  REQUEST_PENDING,
  LOGIN_REQUEST,
  LOGOUT,
  REQUEST_ERROR,
  CLEAR_ERROR
} from '../constants';

import {
  requestSuccess,
  setAuth,
  sendingRequest,
  loginRequest,
  logoutRequest,
  requestError,
  clearError
} from '../actions';

describe('Actions for login api', () => {
  describe('requestSuccess', () => {
    it('should return the correct type and a full user object', () => {
      // arrange
      const expectedResult = {
        type: REQUEST_SUCCESS,
        user: {
          id: '1',
          uuid: '234',
          role: 'admin',
          firstName: 'Tom',
          lastName: 'Fletcher'
        }
      };
      // act
      const result = requestSuccess({
        id: '1',
        uuid: '234',
        role: 'admin',
        firstName: 'Tom',
        lastName: 'Fletcher'
      });

      // assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('setAuth', () => {
    it('should return the correct type and property newAuthState: true', () => {
      // arrange
      const expectedResult = {
        type: SET_AUTH,
        newAuthState: true
      };
      // act
      const result = setAuth(true);

      // assert
      expect(result).toEqual(expectedResult);
    });

    it('should return the correct type and property newAuthState: false', () => {
      // arrange
      const expectedResult = {
        type: SET_AUTH,
        newAuthState: false
      };
      // act
      const result = setAuth(false);

      // assert
      expect(result).toEqual(expectedResult);
    });

    it('should return newAuthState: true for any truthy value', () => {
      // act
      const result = setAuth('false');

      // assert
      expect(result.newAuthState).toBe(true);
    });

    it('should return newAuthState: falsey for any false value', () => {
      // act
      const result = setAuth('');

      // assert
      expect(result.newAuthState).toBe(false);
    });
  });

  describe('sendingRequest', () => {
    it('should return the correct type and have property pending: true', () => {
      // arrange
      const expectedResult = {
        type: REQUEST_PENDING,
        pending: true
      };
      // act
      const result = sendingRequest(true);

      // assert
      expect(result).toEqual(expectedResult);
    });

    it('should return property pending: true for any truthy value', () => {
      // act
      const result = sendingRequest('false');

      // assert
      expect(result.pending).toBe(true);
    });
  });

  describe('loginRequest', () => {
    it('should return the correct type and contain the data object', () => {
      // arrange
      const expectedResult = {
        type: LOGIN_REQUEST,
        data: {
          username: 'Tom',
          password: 'McFly',
          location: '/cr/1',
          code: ''
        }
      };
      // act
      const result = loginRequest({
        username: 'Tom',
        password: 'McFly',
        location: '/cr/1',
        code: ''
      });
      // assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('logoutRequest', () => {
    it('should return the correct type', () => {
      // arrange
      const expectedResult = {
        type: LOGOUT,
        userId: 1
      };
      // act
      const result = logoutRequest(1);
      // assert
      expect(result.type).toBe(expectedResult.type);
    });
  });

  describe('requestError', () => {
    it('should return the correct type and have the error property', () => {
      // arrange
      const expectedResult = {
        type: REQUEST_ERROR,
        error: 'exception!'
      };
      // act
      const result = requestError('exception!');
      // assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('clearError', () => {
    it('should return the correct type', () => {
      // arrange
      const expectedResult = {
        type: CLEAR_ERROR
      };
      // act
      const result = clearError();
      // assert
      expect(result.type).toBe(expectedResult.type);
    });
  });
});
