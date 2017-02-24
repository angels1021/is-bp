/*
*
* Tests for login reducers
*
* */

import loginReducer from '../reducer';
import {
  changeForm,
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

  describe('changeForm', () => {
    it('should handle the changeForm action correctly', () => {
      // arrange
      const expectedResult = state
        .mergeIn(['form'], {
          username: 'Tom',
          password: 'McFly',
          location: '/cr/1',
          code: ''
        });
      // act
      const result = loginReducer(state, changeForm({
        username: 'Tom',
        password: 'McFly',
        location: '/cr/1',
        code: ''
      }));
      // assert
      expect(expectedResult).toEqual(result);
    });

    it('should handle the changeForm action correctly with partial data', () => {
      // arrange
      const expectedResult = state
        .mergeIn(['form'], {
          username: 'Tom',
          password: '',
          location: '/',
          code: ''
        });
      // act
      const result = loginReducer(state, changeForm({
        username: 'Tom'
      }));
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
      const expectedResult = state.set('busy', true);
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
