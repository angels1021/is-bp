import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectModuleMessages } from 'api/translations/selectors';
import LanguageProvider from 'common/containers/LanguageProvider';
import Row from 'common/components/grid/Row';

import { selectLocale } from './selectors';
import routeMessages from './auth.messages';
import './style/style.scss';

export class Auth extends Component {
  constructor() {
    super();

    this.state = {
      module: routeMessages.MODULE
    };
  }

  render() {
    const { locale, messages, children } = this.props;
    return (
      <LanguageProvider locale={locale} messages={messages}>
        <Row
          align="center middle"
          className={`
          collapse expanded
          ps-page-container
          `}
        >
          {React.Children.only(children)}
        </Row>
      </LanguageProvider>
    );
  }
}

Auth.propTypes = {
  children: PropTypes.node.isRequired,
  messages: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired
};

const mapStateToProps = createStructuredSelector({
  messages: selectModuleMessages(),
  locale: selectLocale()
});

export default connect(mapStateToProps)(Auth);
