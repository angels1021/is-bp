/**
 * Helpers for testing selectors
 */
import { fromJS } from 'immutable';
const reducer = (state, action) => action(state);
const reduceIn = (state, path, action) => state.setIn(path, reducer(state.getIn(path), action));
const unchanged = (state) => state;
const changed = (state) => state.set('otherReducer', {});

export const testSelector = (selector, selectorPath, state) => {
  let mockState = fromJS(state);
  // add warning
  const path = selectorPath.slice(0, -1);
  return () => {
    it(`should return state.${selectorPath.join('.')}`, () => {
      // arrange
      const expectedResult = mockState.getIn(selectorPath);
      // act
      const result = selector(mockState);
      // assert
      expect(result).toEqual(expectedResult);
      expect(selector.recomputations()).toBe(1);
    });
    it('should not recompute on changes outside the reducer', () => {
      // arrange
      const parent = path.length > 1 ? path.slice(0, -1) : false;
      mockState = parent
        ? reduceIn(mockState, parent, changed)
        : reducer(mockState, changed);
      mockState = reduceIn(mockState, path, unchanged);
      // act

      selector(mockState);
      // assert
      expect(selector.recomputations()).toBe(1);
    });
    it('should recompute on changes in the reducer', () => {
      // arrange
      mockState = reduceIn(mockState, path, changed);
      // act
      selector(mockState);
      // assert
      expect(selector.recomputations()).toBe(2);
    });
  };
};
