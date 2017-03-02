/**
 * Selectors for the messages reducer.
 */

import { createSelector } from 'reselect';

const selectTranslations = (state) => state.get('translations');

export const selectMessages = createSelector(
  selectTranslations,
  (translations) => translations.get('messages')
);

export const selectLanguage = (locale) => createSelector(
  selectMessages(),
  (messages) => messages.get(locale)
);

export const selectModule = (locale, module) => createSelector(
  selectLanguage(locale),
  (modules) => modules.get(module)
);

export const selectPage = (locale, module, page) => createSelector(
  selectModule(locale, module),
  (pages) => pages.get(page)
);

const selectRequest = createSelector(
  selectTranslations,
  (translations) => translations.get('pending')
);

export const selectNewRequest = createSelector(
  [selectMessages, selectRequest],
  (messages, payload) => {
    if (!payload) return [];
    const { locale, request } = payload;
    return request.filter((req) => {
      const { module, page } = req;
      return !messages.getIn([locale, module, page]);
    });
  }
);
