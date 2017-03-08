/**
 * Test Global.async reducer
 */
import { asyncRequest, asyncSuccess, asyncFail } from '../actions';
import { asyncReducer } from '../reducer';

describe('Global.async reducer', () => {
  let state;
  const requestId = 'bubbleWrap';
  beforeEach(() => {
    state = asyncReducer(undefined, {});
  });

  it('should return the initial state', () => {
    expect(state).toMatchSnapshot();
  });

  describe('ASYNC_REQUEST', () => {
    it('should clear any error associated with the passed id and add it to the loading list', () => {
      // act
      const result = asyncReducer(state, asyncRequest(requestId));
      // assert
      expect(result.get('errors').has(requestId)).toBe(false);
      expect(result.get('loading').includes(requestId)).toBe(true);
    });
  });

  describe('ASYNC_SUCCESS', () => {
    it('should clear any error associated with the passed id and remove it from the loading list', () => {
      // act
      const result = asyncReducer(state, asyncSuccess(requestId));
      // assert
      expect(result.get('errors').has(requestId)).toBe(false);
      expect(result.get('loading').includes(requestId)).toBe(false);
    });
  });

  describe('ASYNC_FAIL', () => {
    it('should remove the passed id from the loading list and set passed error in errors map', () => {
      // arrange
      const error = new Error('some error');
      // act
      const result = asyncReducer(state, asyncFail(requestId, error));
      // assert
      expect(result.get('loading').includes(requestId)).toBe(false);
      expect(result.get('errors').has(requestId)).toBe(true);
      expect(result.getIn(['errors', requestId])).toEqual(error);
    });
  });
});
