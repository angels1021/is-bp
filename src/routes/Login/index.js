import React, { Component, PropTypes } from 'react';

export default class Login extends Component {

  render() {
    return (
      <div>
        Im Login
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  children: PropTypes.object.isRequired
};
