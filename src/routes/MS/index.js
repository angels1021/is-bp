import React, { Component, PropTypes } from 'react';

export default class MS extends Component {

  render() {
    return (
      <div>
        Im MS
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

MS.propTypes = {
  children: PropTypes.object
};

MS.defaultProps = {
  children: PropTypes.object
};
