/*
*
* Tests for login reducers
*
* */

import loginReducer from '../reducer';
import {
  loginSuccess,
  logoutSuccess,
  setAuth,
  sendingRequest,
  requestError,
  clearError
} from '../actions';

describe('Reducers for login api', () => {
  let state;
  beforeEach(() => {
    state = loginReducer(undefined, {});
  });

  it('should return the initial state', () => {
    expect(state).toMatchSnapshot();
  });

  describe('loginSuccess', () => {
    it('should handle the set the user object', () => {
      // arrange
      const expectedResult = state
        .mergeIn(['user'], {
          id: '1',
          uuid: '234',
          role: 'admin',
          firstName: 'Tom',
          lastName: 'Fletcher'
        });
      // act
      const result = loginReducer(state, loginSuccess({
        id: '1',
        uuid: '234',
        role: 'admin',
        firstName: 'Tom',
        lastName: 'Fletcher'
      }));
      // assert
      expect(expectedResult).toEqual(result);
    });
  });

  describe('logoutSuccess', () => {
    it('should reset the user object to {}', () => {
      // arrange
      const expectedResult = state
        .mergeIn(['user'], {});
      // act
      const result = loginReducer(state, logoutSuccess());
      // assert
      expect(expectedResult).toEqual(result);
    });
  });

  describe('setAuth', () => {
    it('should handle the setAuth action correctly', () => {
      // arrange
      const expectedResult = state.set('isLoggedIn', true);
      // act
      const result = loginReducer(state, setAuth(true));
      // assert
      expect(expectedResult).toEqual(result);
    });
  });

  describe('sendingRequest', () => {
    it('should handle the sendingRequest action correctly', () => {
      // arrange
      const expectedResult = state.set('pending', true);
      // act
      const result = loginReducer(state, sendingRequest(true));
      // assert
      expect(expectedResult).toEqual(result);
    });
  });

  describe('requestError', () => {
    it('should handle the requestError action correctly', () => {
      // arrange
      const expectedResult = state.set('error', 'exception');
      // act
      const result = loginReducer(state, requestError('exception'));
      // assert
      expect(expectedResult).toEqual(result);
    });
  });

  describe('clearError', () => {
    it('should handle the clearError action correctly', () => {
      // arrange
      const expectedResult = state.set('error', false);
      // act
      const result = loginReducer(state, clearError());
      // assert
      expect(expectedResult).toEqual(result);
    });
  });
});
