import React, { Component, PropTypes } from 'react';
import Flex from '../../components/grid/Flex';

export default class App extends Component {

  render() {
    return (
      <Flex align="center" direction="column" className="ps-app-container">
        {this.props.children}
      </Flex>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired
};
