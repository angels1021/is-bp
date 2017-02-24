/*
*
* Tests for register actions
*
* */

import {
  CHANGE_FORM,
  SENDING_REQUEST,
  REGISTER_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR,
  cleanForm
} from '../constants';

import {
  changeForm,
  sendingRequest,
  registerRequest,
  requestError,
  clearError
} from '../actions';

describe('Actions for register api', () => {
  describe('changeForm', () => {
    it('should return the correct type and a full newFormState object', () => {
      // arrange
      const expectedResult = {
        type: CHANGE_FORM,
        newFormState: {
          username: 'Tom',
          password: 'McFly',
          location: '/cr/1',
          code: ''
        }
      };
      // act
      const result = changeForm({
        username: 'Tom',
        password: 'McFly',
        location: '/cr/1',
        code: ''
      });

      // assert
      expect(result).toEqual(expectedResult);
    });

    it('should return the correct type and a partial newFormState object', () => {
      // arrange
      const expectedResult = {
        type: CHANGE_FORM,
        newFormState: {
          username: 'Tom',
          password: 'McFly'
        }
      };
      // act
      const result = changeForm({
        username: 'Tom',
        password: 'McFly'
      });

      // assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('sendingRequest', () => {
    it('should return the correct type and have property busy: true', () => {
      // arrange
      const expectedResult = {
        type: SENDING_REQUEST,
        busy: true
      };
      // act
      const result = sendingRequest(true);

      // assert
      expect(result).toEqual(expectedResult);
    });

    it('should return property busy: true for any truthy value', () => {
      // act
      const result = sendingRequest('false');

      // assert
      expect(result.busy).toBe(true);
    });
  });

  describe('registerRequest', () => {
    it('should return the correct type and contain the data object', () => {
      // arrange
      const expectedResult = {
        type: REGISTER_REQUEST,
        data: {
          username: 'Tom',
          password: 'McFly'
        }
      };
      // act
      const result = registerRequest({
        username: 'Tom',
        password: 'McFly'
      });
      // assert
      expect(result).toEqual(expectedResult);
    });

    it('it data object should always have all of the "login form" properties', () => {
      // arrange
      const expectedResult = Object.keys(cleanForm);
      // act
      const result = registerRequest({
        username: 'Tom',
        password: 'McFly'
      });
      const resultKeys = Object.keys(result.data);
      // assert
      expect(resultKeys).toEqual(expectedResult);
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
