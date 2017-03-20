/**
 * Test API Auth reducer
 */
import authReducer from '../reducer';
import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_SET
} from '../constants';

describe('API Auth reducer', () => {
  let state;
  beforeEach(() => {
    state = authReducer(undefined, {});
  });

  it('should return the initial state', () => {
    expect(state).toMatchSnapshot();
  });
  describe('AUTH_SUCCESS', () => {
    it('should handle the set the user object', () => {
      // arrange
      const expectedResult = {
        user: {
          id: '1',
          uuid: '234',
          role: 'admin',
          firstName: 'Tom',
          lastName: 'Fletcher'
        },
        error: false,
        pending: false,
        isLoggedIn: false
      };
      // act
      const result = authReducer(state, {
        type: AUTH_SUCCESS,
        payload: {
          id: '1',
          uuid: '234',
          role: 'admin',
          firstName: 'Tom',
          lastName: 'Fletcher'
        }
      });
      // assert
      expect(result.toJS()).toEqual(expectedResult);
    });
  });
  describe('AUTH_REQUEST', () => {
    it('should handle setting the pending state and clear errors', () => {
      // arrange
      const expectedResult = {
        user: {},
        error: false,
        pending: 'SOME_REQUEST',
        isLoggedIn: false
      };
      const withError = state.set('error', 'an error');
      // act
      const result = authReducer(withError, {
        type: AUTH_REQUEST,
        payload: 'SOME_REQUEST'
      });
      // assert
      expect(result.toJS()).toEqual(expectedResult);
    });
  });
  describe('AUTH_ERROR', () => {
    it('should handle setting the state error and clear any pending request', () => {
      // arrange
      const err = new Error('boomerang');
      const expectedResult = {
        user: {},
        error: err,
        pending: false,
        isLoggedIn: false
      };
      const withPending = state.set('pending', 'REQUEST');
      // act
      const result = authReducer(withPending, {
        type: AUTH_ERROR,
        payload: err
      });
      // assert
      expect(result.toJS()).toEqual(expectedResult);
    });
  });
  describe('AUTH_SET', () => {
    it('should handle setting the state isLoggedIn prop', () => {
      // arrange
      const expectedResult = {
        user: {},
        error: false,
        pending: false,
        isLoggedIn: true
      };
      // act
      const result = authReducer(state, {
        type: AUTH_SET,
        payload: true
      });
      // assert
      expect(result.toJS()).toEqual(expectedResult);
    });
  });
});
