/*
*
* Tests for register reducers
*
* */

import registerReducer from '../reducers';
import {
  changeForm,
  sendingRequest,
  requestError,
  clearError
} from '../actions';

describe('Reducers for register api', () => {
  let state;
  beforeEach(() => {
    state = registerReducer(undefined, {});
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
          password: 'McFly'
        });
      // act
      const result = registerReducer(state, changeForm({
        username: 'Tom',
        password: 'McFly'
      }));
      // assert
      expect(expectedResult).toEqual(result);
    });

    it('should handle the changeForm action correctly with partial data', () => {
      // arrange
      const expectedResult = state
        .mergeIn(['form'], {
          username: 'Tom',
          password: ''
        });
      // act
      const result = registerReducer(state, changeForm({
        username: 'Tom'
      }));
      // assert
      expect(expectedResult).toEqual(result);
    });
  });

  describe('sendingRequest', () => {
    it('should handle the sendingRequest action correctly', () => {
      // arrange
      const expectedResult = state.set('busy', true);
      // act
      const result = registerReducer(state, sendingRequest(true));
      // assert
      expect(expectedResult).toEqual(result);
    });
  });

  describe('requestError', () => {
    it('should handle the requestError action correctly', () => {
      // arrange
      const expectedResult = state.set('error', 'exception');
      // act
      const result = registerReducer(state, requestError('exception'));
      // assert
      expect(expectedResult).toEqual(result);
    });
  });

  describe('clearError', () => {
    it('should handle the clearError action correctly', () => {
      // arrange
      const expectedResult = state.set('error', false);
      // act
      const result = registerReducer(state, clearError());
      // assert
      expect(expectedResult).toEqual(result);
    });
  });
});
