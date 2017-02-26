import React, { Component, PropTypes } from 'react';

export default class App extends Component {

  render() {
    return (
      <div className="ps-app-container ps-flex__center-col">
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired
};
