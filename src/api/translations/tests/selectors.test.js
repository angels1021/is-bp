/**
 * Test translations selectors
 */
import { fromJS } from 'immutable';
import {
  selectMessages,
  selectRequest,
  selectLocaleTranslations,
  selectModuleMessages,
  selectNewRequest
} from '../selectors';

describe('API translations selectors', () => {
  let mockState;
  let mockProps;
  const reducer = (state, action) => action(state);
  const unchanged = (state) => state;
  const changeOther = (state) => state.set('otherReducer', {});

  beforeEach(() => {
    mockState = fromJS({
      translations: {
        error: false,
        pending: false,
        messages: {
          en: {}
        }
      }
    });

    mockProps = {
      locale: 'en',
      module: 'ms'
    };
  });

  describe('selectMessages', () => {
    // arrange
    let testState; // local state point, so tests in block are continues
    const selector = selectMessages();

    it('should return the messages object', () => {
      // arrange
      testState = mockState;
      const expectedResult = { en: {} };
      // act
      const result = selector(testState).toJS();
      // assert - use once
      expect(result).toEqual(expectedResult);
    });

    it('should not recompute if no changes were made to state', () => {
      // act
      testState = reducer(testState, unchanged);
      selector(testState); // call to run selector
      // assert - mockState is unchanged
      expect(selector.recomputations()).toBe(1);
    });

    it('should recompute if changes were made to the messages object', () => {
      // arrange
      const change = (state) => state.mergeDeepIn(['translations', 'messages'], { he: {} });
      const expectedResult = { en: {}, he: {} };
      // act
      testState = reducer(testState, change);
      const result = selector(testState).toJS();
      // assert - mockState 'messages' changed
      expect(result).toEqual(expectedResult);
      expect(selector.recomputations()).toBe(2);
    });

    it('should not recompute if state was changed outside of translations', () => {
      // act
      testState = reducer(testState, changeOther);
      selector(testState);
      // assert - mockState change outside translations
      expect(selector.recomputations()).toBe(2);
    });
  });

  describe('selectRequest', () => {
    // arrange
    let testState; // local state point, so tests in block are continues
    const selector = selectRequest();

    it('should return the pending property value', () => {
      // arrange
      testState = mockState;
      const expectedResult = false;
      // act
      const result = selector(testState);
      // assert - use once
      expect(result).toEqual(expectedResult);
    });

    it('should not recompute if no changes were made to state', () => {
      // act
      testState = reducer(testState, unchanged);
      selector(testState); // call to run selector
      // assert - mockState is unchanged
      expect(selector.recomputations()).toBe(1);
    });

    it('should recompute if changes were made to the pending property', () => {
      // arrange
      const change = (state) => state.setIn(['translations', 'pending'], {});
      const expectedResult = {};
      // act
      testState = reducer(testState, change);
      const result = selector(testState);
      // assert - mockState 'messages' changed
      expect(result).toEqual(expectedResult);
      expect(selector.recomputations()).toBe(2);
    });

    it('should not recompute if state was changed outside of translations', () => {
      // act
      testState = reducer(testState, changeOther);
      selector(testState);
      // assert - mockState change outside translations
      expect(selector.recomputations()).toBe(2);
    });
  });

  describe('selectLocaleTranslations', () => {
    it('should return all translation modules for a given locale', () => {
      const initialLang = {
        app: { common: { 'app.common.text': 'text' } }
      };
      const setExisting = (state) => state.mergeIn(['translations', 'messages', 'en'], initialLang);
      // arrange
      mockState = reducer(mockState, setExisting);
      const selector = selectLocaleTranslations(mockState);
      // act
      const result = selector(mockState, mockProps).toJS();
      // assert
      expect(result).toEqual(initialLang);
    });

    it('should recompute on changes to locale or messages', () => {
      // arrange
      const selector = selectLocaleTranslations(mockState);
      const changeMessages = (state) => state.mergeIn(['translations', 'messages'], {
        he: {}
      });
      selector(mockState, mockProps);
      // act
      mockState = reducer(mockState, changeMessages);
      selector(mockState, mockProps);
      // assert
      expect(selector.recomputations()).toBe(2);
      // act
      mockProps = { ...mockProps, locale: 'he' };
      selector(mockState, mockProps);
      // assert
      expect(selector.recomputations()).toBe(3);
      // act
      mockState = reducer(mockState, changeOther);
      selector(mockState, mockProps);
      // assert
      expect(selector.recomputations()).toBe(3);
    });
  });

  describe('selectModuleMessages', () => {
    // arrange
    const setExisting = (state) => state.mergeIn(['translations', 'messages', 'en'], {
      app: { common: { 'app.common.text': 'text' } }, ms: { settings: { 'ms.settings.text': 'text' } }
    });
    it('should return aggregated message for a module and locale', () => {
      const selector = selectModuleMessages();
      const expectedREsults = {
        'app.common.text': 'text',
        'ms.settings.text': 'text'
      };
      mockState = reducer(mockState, setExisting);
      // act
      const result = selector(mockState, mockProps);
      // assert
      expect(result).toEqual(expectedREsults);
    });

    it('should recompute on changes to module requested or changes to selected locale', () => {
      // arrange
      const selector = selectModuleMessages();
      mockState = reducer(mockState, setExisting);
      selector(mockState, mockProps);
      // act
      mockState = reducer(mockState, (state) => state.mergeIn(['translations', 'messages'], { he: {} }));
      selector(mockState, mockProps);
      // assert - change is not to selected locale (en)
      expect(selector.recomputations()).toBe(1);
      // act
      mockState = reducer(mockState, (state) => state.mergeDeepIn(['translations', 'messages'], {
        en: { app: { common: { 'app.common.text2': 'text2' } } }
      }));
      selector(mockState, mockProps);
      // assert - change is to selected locale
      expect(selector.recomputations()).toBe(2);
      // act
      mockProps = { ...mockProps, module: 'cr' };
      selector(mockState, mockProps);
      // assert - requested module changed
      expect(selector.recomputations()).toBe(3);
    });

  });

  describe('selectNewRequest', () => {
    it('should return empty array if no request is pending', () => {
      // arrange
      const selector = selectNewRequest();
      // act
      const result = selector(mockState);
      // assert
      expect(result).toEqual([]);
    });

    it('should return filtered module requests according to existing translations', () => {
      // arrange
      const setExisting = (state) => state.mergeIn(['translations', 'messages', 'en'], {
        app: { common: { 'app.common.text': 'text' } }
      });
      const setRequest = (state) => state.setIn(['translations', 'pending'], {
        locale: 'en',
        request: [{ module: 'app', page: 'common' }, { module: 'ms', page: 'settings' }]
      });
      mockState = reducer(mockState, setExisting);
      mockState = reducer(mockState, setRequest);
      const expectedResult = [{ module: 'ms', page: 'settings' }];
      const selector = selectNewRequest();
      // act
      const result = selector(mockState);

      // assert
      expect(result).toEqual(expectedResult);
    });

    it('should only recompute on changes to pending or messages', () => {
      // arrange
      const selector = selectNewRequest();
      const change = (state) => state.setIn(['translations', 'pending'], {});
      const changeParent = (state) => state.setIn(['translations', 'error'], {});
      const changeMessages = (state) => state.mergeIn(['translations', 'messages', 'en'], {
        app: { common: { 'app.common.text': 'text' } }
      });
      // act
      selector(mockState);
      // assert
      expect(selector.recomputations()).toBe(1);
      // act
      mockState = reducer(mockState, change);
      selector(mockState);
      // assert
      expect(selector.recomputations()).toBe(2);
      // act
      mockState = reducer(mockState, changeParent);
      selector(mockState);
      // assert
      expect(selector.recomputations()).toBe(2);
      // act
      mockState = reducer(mockState, changeMessages);
      selector(mockState);
      // assert
      expect(selector.recomputations()).toBe(3);
    });
  });
});
