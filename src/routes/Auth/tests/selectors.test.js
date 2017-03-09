/**
 * Test Auth module selectors
 */
import { fromJS } from 'immutable';
import { selectLocaleState, selectLocale } from '../selectors';

describe('Auth module selectors', () => {
  const reducer = (state, action) => action(state);
  const reduceIn = (state, path, action) => state.setIn(path, reducer(state.getIn(path), action));
  const unchanged = (state) => state;
  const changed = (state) => state.set('otherReducer', {});
  const storeModel = {
    authModule: {
      locale: {
        error: false,
        pending: false,
        locale: 'en'
      }
    }
  };

  describe('selectLocaleState', () => {
    let mockState = fromJS(storeModel);
    const selector = selectLocaleState();
    it('should return the locale reducer', () => {
      // arrange
      const expectedResult = mockState.getIn(['authModule', 'locale']);
      // act
      const result = selector(mockState);
      // assert
      expect(result).toEqual(expectedResult);
      expect(selector.recomputations()).toBe(1);
    });
    it('should not recompute on changes outside the authModule reducer', () => {
      // arrange
      mockState = reducer(mockState, changed);
      mockState = reduceIn(mockState, ['authModule'], unchanged);
      // act

      selector(mockState);
      // assert
      expect(selector.recomputations()).toBe(1);
    });
    it('should recompute on changes in the authModule reducer', () => {
      // arrange
      mockState = reduceIn(mockState, ['authModule'], changed);
      // act
      selector(mockState);
      // assert
      expect(selector.recomputations()).toBe(2);
    });
  });

  describe('selectLocale', () => {
    let mockState = fromJS(storeModel);
    const selector = selectLocale();
    it('should return the currently active locale', () => {
      // arrange
      const expectedResult = mockState.getIn(['authModule', 'locale', 'locale']);
      // act
      const result = selector(mockState);
      // assert
      expect(result).toEqual(expectedResult);
      expect(selector.recomputations()).toBe(1);
    });
    it('should not recompute on changes outside the locale reducer', () => {
      // arrange
      mockState = reduceIn(mockState, ['authModule'], changed);
      mockState = reduceIn(mockState, ['authModule', 'locale'], unchanged);
      // act

      selector(mockState);
      // assert
      expect(selector.recomputations()).toBe(1);
    });
    it('should recompute on changes in the locale reducer', () => {
      // arrange
      mockState = reduceIn(mockState, ['authModule', 'locale'], changed);
      // act
      selector(mockState);
      // assert
      expect(selector.recomputations()).toBe(2);
    });
  });
});
