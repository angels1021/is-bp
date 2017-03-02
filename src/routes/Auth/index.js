import React, { Component, PropTypes } from 'react';
import en from 'i18n/en';

import LanguageProvider from 'common/containers/LanguageProvider';
import Row from 'common/components/grid/Row';
import './style/style.scss';

export default class Auth extends Component {

  render() {
    return (
      <LanguageProvider locale="en" messages={en}>
        <Row
          align="center middle"
          className={`
          collapse expanded
          ps-page-container
          `}
        >
          {this.props.children}
        </Row>
      </LanguageProvider>
    );
  }
}

Auth.propTypes = {
  children: PropTypes.node.isRequired
};
