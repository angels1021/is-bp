import React, { PropTypes } from 'react';
import gridComponent from './gridComponent';

const Row = ({ children, className }) => (<div className={className} >{children}</div>);

Row.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

Row.defaultProps = {
  className: ''
};

export default gridComponent('row')(Row);
