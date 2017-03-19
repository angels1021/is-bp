/**
 * Test App global actions
 */

import { ASYNC_REQUEST, ASYNC_SUCCESS, ASYNC_FAIL } from '../constants';
import { asyncRequest, asyncSuccess, asyncFail } from '../actions';

describe('App global actions', () => {
  describe('asyncRequest', () => {
    it('should create the correct action object for ASYNC_REQUEST', () => {
      // arrange
      const expectedResult = {
        type: ASYNC_REQUEST,
        meta: { id: 'someModule' }
      };
      // act
      const result = asyncRequest('someModule');
      // assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('asyncSuccess', () => {
    it('should create the correct action object for ASYNC_SUCCESS', () => {
      // arrange
      const expectedResult = {
        type: ASYNC_SUCCESS,
        meta: { id: 'someModule' }
      };
      // act
      const result = asyncSuccess('someModule');
      // assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('asyncFail', () => {
    it('should create the correct action object for ASYNC_FAIL', () => {
      // arrange
      const error = new Error('some error');
      const expectedResult = {
        type: ASYNC_FAIL,
        payload: error,
        error: true,
        meta: { id: 'someModule' }
      };
      // act
      const result = asyncFail(error, 'someModule');
      // assert
      expect(result).toEqual(expectedResult);
    });
  });
});
