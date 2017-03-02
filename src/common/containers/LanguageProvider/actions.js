/*
 *
 * LanguageProvider actions factory
 * since all pages share the same language structure
 * we can use a factory to create their actions
 *
 */

const LanguageActionsFactory = (
  CHANGE_LOCALE_REQUEST,
  CHANGE_LOCALE_SUCCESS,
  REQUEST_MESSAGES,
  MESSAGES_PENDING,
  MESSAGES_SUCCESS,
  MESSAGES_ERROR
) => ({
  /**
   * changeLocale action creator
   *
   * @param {string} locale - locale identifier to request
   * @param {object} request - locale modules request object
   * @property {string} module - name of the module to fetch
   * @property {string} page - name of the page messages to fetch
   */
  changeLocale: (locale, request) => ({
    type: CHANGE_LOCALE_REQUEST,
    locale,
    request
  }),


  /**
   * changeLocaleSuccess action creator
   *
   * @param {string} locale
   * @param {array} response
   * @property {object} responseItem
   * @property {string} responseItem.module
   * @property {string} responseItem.page
   * @property {object} responseItem.messages
   */
  changeLocaleSuccess: (locale, response) => ({
    type: CHANGE_LOCALE_SUCCESS,
    locale,
    response
  }),
  /**
   * requestMessages action creator
   *
   * @param {string} locale - locale identifier to request
   * @param {object} request - locale modules request object
   * @property {string} module - name of the module to fetch
   * @property {string} page - name of the page messages to fetch
   */
  requestMessages: (locale, request) => ({
    type: REQUEST_MESSAGES,
    locale,
    request
  }),

  /**
   * requestPending action creator
   *
   * set the messages state as pending
   */
  requestPending: () => ({
    type: MESSAGES_PENDING
  }),

  /**
   * requestSuccess action creator
   *
   * @param {string} locale - locale identifier to request
   * @param {array} response
   * @property {object} responseItem
   * @property {string} responseItem.module
   * @property {string} responseItem.page
   * @property {object} responseItem.messages
   */
  requestSuccess: (locale, response) => ({
    type: MESSAGES_SUCCESS,
    locale,
    response
  }),

  /**
   * requestError action creator
   *
   * @param {object} error - new Error('reason')
   */
  requestError: (error) => ({
    type: MESSAGES_ERROR,
    error
  })
});

export default LanguageActionsFactory;
