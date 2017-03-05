/**
 * Selectors for the messages reducer.
 */
import { createSelector } from 'reselect';
import { memoize } from 'lodash-es';

/**
 * plain selectors, single memoize cache
 */
const selectGlobal = () => memoize((state) => state.get('global'));
const selectModuleName = () => (_, props) => props.module;
const selectLocale = () => (_, props) => props.locale;

export const selectTranslations = () => createSelector(
  selectGlobal(),
  (global) => global.get('translations')
);

export const selectMessages = () => createSelector(
  selectTranslations(),
  (translations) => translations ? translations.get('messages') : {}
);

export const selectRequest = () => createSelector(
  selectTranslations(),
  (translations) => translations.get('pending')
);

export const selectLocaleTranslations = () => createSelector(
  selectMessages(),
  selectLocale(),
  (translations, locale) => translations.get(locale)
);

/**
 * messages by module Selector
 */
export const selectModuleMessages = () => createSelector(
  selectLocaleTranslations(),
  selectModuleName(),
  (modules, module) => {
    const found = (modules && modules.has(module) ? modules.get(module).flatten(0).toJS() : {});
    const common = (modules && modules.has('app') ? modules.get('app').flatten(0).toJS() : {});
    return { ...common, ...found };
  }
);

export const selectNewRequest = () => createSelector(
  selectRequest(),
  selectMessages(),
  (payload, messages) => {
    if (!payload) return [];
    const { locale, request } = payload;
    if (!locale || !request) return [];
    return request.filter((req) => {
      const { module, page } = req;
      return !messages.getIn([locale, module, page]);
    });
  }
);
