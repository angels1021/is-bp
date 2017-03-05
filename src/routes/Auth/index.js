import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectModuleMessages } from 'api/translations/selectors';
import { requestMessages } from 'api/translations/actions';
import LanguageProvider from 'common/containers/LanguageProvider';
import Row from 'common/components/grid/Row';

import { selectLocale } from './selectors';
import routeMessages from './auth.messages';
import './style/style.scss';

class Auth extends Component {
  constructor() {
    super();

    this.state = {
      module: routeMessages.MODULE
    };
  }

  componentWillMount() {
    const { MODULE, PAGE } = routeMessages;
    this.props.requestMessages(this.props.locale, [
      { module: 'app', page: 'common' },
      { module: MODULE, page: PAGE }
    ]);
  }

  render() {
    const { locale, messages } = this.props;
    return (
      <LanguageProvider locale={locale} messages={messages}>
        <Row
          align="center middle"
          className={`
          collapse expanded
          ps-page-container
          `}
        >
          {messages && this.props.children}
        </Row>
      </LanguageProvider>
    );
  }
}

Auth.propTypes = {
  children: PropTypes.node.isRequired,
  messages: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  requestMessages: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  requestMessages: (locale, modules) => dispatch(requestMessages(locale, modules))
});

const mapStateToProps = createStructuredSelector({
  messages: selectModuleMessages(),
  locale: selectLocale()
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
