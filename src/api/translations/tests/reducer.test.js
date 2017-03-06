/**
 * Test reducer
 */
import translationsReducer from '../reducer';
import { requestMessages, messageSuccess, messagesError } from '../actions';

describe('API translations reducer', () => {
  let state;
  beforeEach(() => {
    state = translationsReducer(undefined, {});
  });

  it('should return the initial state', () => {
    expect(state).toMatchSnapshot();
  });

  describe('MESSAGES_REQUEST', () => {
    it('should reset error and set pending to the request', () => {
      // assert
      const locale = 'en';
      const request = [
        {
          module: 'app',
          page: 'common',
          messages: {
            'app.common.text': 'text'
          }
        }
      ];
      const expectedResults = state
        .set('error', false)
        .set('pending', { locale, request });

      // act
      const result = translationsReducer(state, requestMessages(locale, request));

      // assert
      expect(expectedResults).toEqual(result);
    });
  });

  describe('MESSAGES_SUCCESS', () => {
    it('should reset error,reset pending and update messages', () => {
      // assert
      const locale = 'he';
      const response = [
        {
          module: 'app',
          page: 'common',
          messages: {
            'app.common.text': 'text'
          }
        }
      ];

      const expectedResults = state
        .set('error', false)
        .set('pending', false)
        .mergeIn(['messages', locale, 'app', 'common'], response[0].messages);

      // act
      const result = translationsReducer(state, messageSuccess(locale, response));
      // assert
      expect(expectedResults).toEqual(result);
    });
  });

  describe('MESSAGES_FAIL', () => {
    it('should reset pending and set error with the error received', () => {
      // assert
      const error = new Error('some error');

      const expectedResults = state
        .set('error', error)
        .set('pending', false);

      // act
      const result = translationsReducer(state, messagesError(error));

      // assert
      expect(expectedResults).toEqual(result);
    });
  });
});
