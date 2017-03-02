/*
 *
 * LanguageProvider locale reducer factory
 * since all pages share the same language structure
 * we can use a factory to create their reducers
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_LOCALE } from '../App/constants';

export default function LanguageReducerFactory(
  CHANGE_LOCALE_REQUEST,
  CHANGE_LOCALE_SUCCESS,
  CHANGE_LOCALE_FAIL
) {
  const initialState = fromJS({
    locale: DEFAULT_LOCALE,
    pending: false,
    error: false
  });

  return (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case CHANGE_LOCALE_REQUEST: {
        state.set('error', false);
        return state.set('pending', payload);
      }
      case CHANGE_LOCALE_FAIL: {
        const { error } = payload;
        state.set('error', error);
        return state.set('pending', false);
      }
      case CHANGE_LOCALE_SUCCESS: {
        const { locale } = payload;
        state.set('locale', locale);
        return state.set('pending', false);
      }
      default:
        return state;
    }
  };
}


/* eslint-disable */

/*
plan
auth
reducer:
  locale,
  messages: {
    page1: {},
    page2: {}
    ....
  }

cr
reducer:
  locale,
  messages: {
    ....
  }

ms
reducer:
  locale,
  messages: {
    ...
  }


//globally?
messages
  en
    app
      common
      ....
    auth
      login
      register
      ...
    cr:
      cart(main)
      payment
      ...
    ms
      reports
      settings
      ....
  'he'
    .....

// global selectors
(state) => state.get('messages')
(messages) => messages.get('en')
(locale) => local.get('app')
(local, app, module) => local.get(module) => app.merge(module).flatten().toJS()


// on locale change
moduleReducer
messages

requestChange(locale, [{module, page}, {module, page}])
watcher take
-> take routes/module/LOCALE_CHANGE_REQUEST
-> call requestChange saga
-> put LOCALE_CHANGE_PENDING payload locale
-> check local messages reducer
-> exists -> put routes/module/LOCALE_CHANGE_SUCCESS payload locale
-> missing
call changeLocale saga: pass payload + existing lang[{}] (put REQUEST_MESSAGES_PENDING)
race: messages saga, requestChange constant
messages saga
-> winner messages saga success
(-> put REQUEST_MESSAGES_SUCCESS payload locale, [{module, page, messages}, {module, page, messages}])
-> put LOCALE_CHANGE_PENDING payload false
-> put LOCALE_CHANGE_SUCCESS payload locale
------
-> winner messages fail
(-> put REQUEST_MESSAGES_PENDING payload false
 -> put REQUEST_MESSAGES_FAIL payload - error) in it's saga
-> put LOCALE_CHANGE_PENDING payload false
-> put LOCALE_CHANGE_FAIL payload - error
------
-> winner take requestChange ->
-> put REQUEST_MESSAGES_PENDING false;
-> call requestChange saga

componentWillMount -> requestMessages(locale, [{module, page}, {module, page}])
put routes/module/REQUEST_MESSAGES payload ^

-> check local messages reducer

// messages selector
(state) => state.get('authPage');
(authPage) => authPage.get('messages');

reducer = (state = { locale, messages }, action) => {
  action.type === `routes/${page}/${CHANGE_LOCAL}`
  state.set('locale', action.locale)

  action.type === `routes/${page}/${ADD_MESSAGES}`
  state.mergeIn(['messages'], action.messages);
}


//define messages
auth.messages.js
export default {
  login: {
    id: auth.page1.login,
    defaultMessage: 'login',
    description: 'login button label'
  }
}
dev
export defineMessages(messages);

prod
export Object.keys(messages).reduce((col, key) => {
  col[key] = { id: messages[key].id }
  return col;
}, {});


// saga messages
3 WATCHERS
listen to auth/REQUEST_MESSAGES
listen to cr/REQUEST_MESSAGES
listen to ms/REQUEST_MESSAGES
payload: { locale, module, page }

dispatch auth/MESSAGES_PENDING
...

callMessagesSaga - single, only api
parameters:
(locale, ids, CHANGE_LOCALE) ->
change locale event is specific so needs to be passed in

race {
messages: api call saga
changeLocale: take(CHANGE_LOCALE)
}

if(messages) {
  success return  messages
  fail return false
} else if (changeLocale) {
  continue to CHANGE_LOCALE saga

}

back to watcher dispatch auth/MESSAGES_SUCCESS
....cr, ms
payload { messages }

or dispatch auth/MESSAGES_ERROR
payload { error }


// saga locale
watchers:
take auth/CHANGE_LOCALE
payload { locale, module, page }
put(auth/REQUEST_MESSAGES)

*/
