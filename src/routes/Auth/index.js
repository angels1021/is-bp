import React, { Component, PropTypes } from 'react';
import Row from 'common/components/grid/Row';
import './style/style.scss';

export default class Auth extends Component {

  render() {
    return (
      <Row
        align="center middle" className={`
      collapse expanded
      ps-page-container
      `}
      >
        {this.props.children}
      </Row>
    );
  }
}

Auth.propTypes = {
  children: PropTypes.node.isRequired
};
