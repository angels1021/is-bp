/**
 * Test global selectors
 */

import { fromJS } from 'immutable';
import {
  selectAsync,
  selectLoading,
  selectErrors,
  selectRequestLoading,
  selectRequestErrors,
  selectLocationState
} from '../selectors';

describe('Global.async selectors', () => {
  const stateModel = {
    global: {
      async: {
        errors: {},
        loading: []
      }
    }
  };
  const reducer = (state, action) => action(state);

  describe('selectAsync', () => {
    let mockState = fromJS(stateModel);
    const selector = selectAsync();
    it('should return the async reducer sate', () => {
      // arrange
      const expectedResult = stateModel.global.async;
      // act
      const result = selector(mockState);
      // assert
      expect(result.toJS()).toEqual(expectedResult);
      expect(selector.recomputations()).toBe(1);
    });
    it('should not recompute on changes outside the global reducer', () => {
      // act
      mockState = reducer(mockState, (state) => state.set('otherReducer', {}));
      selector(mockState);
      // assert
      expect(selector.recomputations()).toBe(1);
    });
    it('should recompute on changes in the global reducer', () => {
      // act
      mockState = reducer(mockState, (state) => state.setIn(['global', 'otherReducer'], {}));
      selector(mockState);
      // assert
      expect(selector.recomputations()).toBe(2);
    });
  });

  describe('selectLoading', () => {
    let mockState = fromJS(stateModel);
    const selector = selectLoading();
    it('should return the loading list', () => {
      // arrange
      const expectedResult = [];
      // act
      const result = selector(mockState);
      // assert
      expect(result.toJS()).toEqual(expectedResult);
      expect(selector.recomputations()).toBe(1);
    });
    it('should not recompute on changes outside the async reducer', () => {
      // act
      mockState = reducer(mockState, (state) => state.setIn(['global', 'otherReducer'], {}));
      selector(mockState);
      // assert
      expect(selector.recomputations()).toBe(1);
    });
    it('should recompute on changes in the async reducer', () => {
      // act
      mockState = reducer(mockState, (state) => state.setIn(['global', 'async', 'errors', 'bubbleWrap'], {}));
      selector(mockState);
      // assert
      expect(selector.recomputations()).toBe(2);
    });
  });
  describe('selectErrors', () => {
    let mockState = fromJS(stateModel);
    const selector = selectErrors();
    it('should return the errors map', () => {
      // arrange
      const expectedResult = {};
      // act
      const result = selector(mockState);
      // assert
      expect(result.toJS()).toEqual(expectedResult);
      expect(selector.recomputations()).toBe(1);
    });
    it('should not recompute on changes outside the async reducer', () => {
      // act
      mockState = reducer(mockState, (state) => state.setIn(['global', 'otherReducer'], {}));
      selector(mockState);
      // assert
      expect(selector.recomputations()).toBe(1);
    });
    it('should recompute on changes in the async reducer', () => {
      // act
      mockState = reducer(mockState, (state) => state.setIn(['global', 'async', 'errors', 'bubbleWrap'], {}));
      selector(mockState);
      // assert
      expect(selector.recomputations()).toBe(2);
    });
  });
  describe('selectRequestLoading', () => {
    const requestId = 'bubbleWrap';
    const selector = selectRequestLoading();
    let mockState = fromJS(stateModel)
      .setIn(['global', 'async', 'loading'], requestId);
    it('should return the errors map', () => {
      // act
      const result = selector(mockState);
      // assert
      expect(result(requestId)).toBe(true);
      expect(selector.recomputations()).toBe(1);
    });
    it('should not recompute on changes outside the loading list', () => {
      // act
      mockState = reducer(mockState, (state) => state.setIn(['global', 'async', 'errors', 'otherRequest'], {}));
      selector(mockState)(requestId);
      // assert
      expect(selector.recomputations()).toBe(1);
    });
    it('should recompute on changes to the loading list', () => {
      // act
      mockState = reducer(mockState, (state) => state.setIn(['global', 'async', 'loading'], 'otherRequest'));
      selector(mockState)(requestId);
      // assert
      expect(selector.recomputations()).toBe(2);
    });
  });
  describe('selectRequestErrors', () => {
    const requestId = 'bubbleWrap';
    const error = new Error('some error');
    const selector = selectRequestErrors();
    let mockState = fromJS(stateModel)
      .setIn(['global', 'async', 'errors', requestId], error);
    it('should return the errors map', () => {
      // act
      const result = selector(mockState);
      // assert
      expect(result(requestId)).toEqual(error);
      expect(selector.recomputations()).toBe(1);
    });

    it('should not recompute on changes outside the errors map', () => {
      // act
      mockState = reducer(mockState, (state) => state.setIn(['global', 'async', 'loading'], 'otherRequest'));
      selector(mockState)(requestId);
      // assert
      expect(selector.recomputations()).toBe(1);
    });

    it('should recompute on changes to the errors map', () => {
      // act
      mockState = reducer(mockState, (state) => state.setIn(['global', 'async', 'errors', 'otherRequest'], {}));
      selector(mockState)(requestId);
      // assert
      expect(selector.recomputations()).toBe(2);
    });
  });
});


describe('global common selectors', () => {
  describe('selectLocationState', () => {
    const locationStateSelector = selectLocationState();
    it('should select the route as a plain JS object', () => {
      const route = fromJS({
        locationBeforeTransitions: null
      });
      const mockedState = fromJS({
        route
      });
      expect(locationStateSelector(mockedState)).toEqual(route.toJS());
    });
  });
});

