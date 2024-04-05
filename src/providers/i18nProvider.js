// @flow

import polyglotI18nProvider from 'ra-i18n-polyglot';

import englishMessages from '../i18n/en';

export default polyglotI18nProvider( locale => {
  switch ( locale ) {
    case 'en':
    default:
      return englishMessages;
  }
}, 'en', {
  allowMissing: true,
} );
