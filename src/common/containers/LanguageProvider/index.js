import React, { PropTypes, PureComponent } from 'react';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'api/locale/constants';

class LanguageProvider extends PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { children, locale, messages } = this.props;
    return (
      <IntlProvider locale={locale} key={locale} messages={messages}>
        {React.Children.only(children)}
      </IntlProvider>);
  }
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired
};

LanguageProvider.defaultProps = {
  locale: DEFAULT_LOCALE,
  messages: {}
};

export default LanguageProvider;
