import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router/es';

export default class App extends Component {

  render() {
    return (
      <div className="ps-app-container ps-flex__center-col">
        <nav className="ps-shrink">
          <Link to="/">CR</Link>
          {', '}
          <Link to="/ms">MS</Link>
          {', '}
          <Link to="/sample">sample</Link>
        </nav>

        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired
};
