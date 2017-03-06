/**
 * test action creators for the translations api
 */
import { requestMessages, messageSuccess, messagesError } from '../actions';

import {
  MESSAGES_REQUEST,
  MESSAGES_SUCCESS,
  MESSAGES_FAIL
} from '../constants';

describe('API: Translations actions', () => {
  describe('requestMessages', () => {
    it('should return the complete action object for  MESSAGES_REQUEST', () => {
      // assert
      const expectedResult = {
        type: MESSAGES_REQUEST,
        payload: {
          locale: 'en',
          request: [
            {
              module: 'app',
              page: 'common'
            }
          ]
        }
      };
      // act
      const result = requestMessages('en', [{
        module: 'app',
        page: 'common'
      }]);
      // assert
      expect(expectedResult).toEqual(result);
    });
  });

  describe('messageSuccess', () => {
    it('should return the complete action object for  MESSAGES_SUCCESS', () => {
      // assert
      const expectedResult = {
        type: MESSAGES_SUCCESS,
        payload: {
          locale: 'en',
          response: [
            {
              module: 'app',
              page: 'common',
              messages: {
                'app.common.text': 'text'
              }
            }
          ]
        }
      };
      // act
      const result = messageSuccess('en', [{
        module: 'app',
        page: 'common',
        messages: {
          'app.common.text': 'text'
        }
      }]);
      // assert
      expect(expectedResult).toEqual(result);
    });
  });

  describe('messagesError', () => {
    it('should return the complete action object for  MESSAGES_FAIL', () => {
      // assert
      const someError = new Error('some error');
      const expectedResult = {
        type: MESSAGES_FAIL,
        payload: {
          error: someError
        }
      };
      // act
      const result = messagesError(someError);
      // assert
      expect(expectedResult).toEqual(result);
    });
  });
});
