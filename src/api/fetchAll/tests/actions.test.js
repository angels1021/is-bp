/**
 * Test fetchAll actions creators
 */

import { fetchAll, fetchAllCreateSaga } from '../actions';
import { FETCH_ALL } from '../constants';

describe('API fetchAll actions', () => {
  describe('fetchAll', () => {
    it('should create the correct action object for **anyModule**/FETCH_ALL', () => {
      // arrange
      const expectedResult = {
        type: 'someModule/FETCH_ALL',
        payload: { id: 'someModule' }
      };
      // act
      const result = fetchAll('someModule');
      // assert
      expect(result).toEqual(expectedResult);
    });
  });
  describe('fetchAllCreateSaga', () => {
    it('should create the correct action object for FETCH_ALL', () => {
      // arrange
      const options = {
        requestId: 'someModule',
        fetchGenerator: 'generator function',
        parentId: 'someParentModule',
        resolveSelector: 'some selector'
      };
      const expectedResult = {
        type: FETCH_ALL,
        payload: {
          requestId: 'someModule/FETCH_ALL',
          fetchGenerator: 'generator function',
          parentId: 'someParentModule/FETCH_ALL',
          resolveSelector: 'some selector'
        }
      };
      // act
      const result = fetchAllCreateSaga(options);
      // assert
      expect(result).toEqual(expectedResult);
    });
  });
});
