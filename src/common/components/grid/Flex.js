import React, { PropTypes } from 'react';
import gridComponent from './gridComponent';

const Flex = ({ children, className }) => (<div className={className} >{children}</div>);

Flex.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

Flex.defaultProps = {
  className: ''
};

export default gridComponent('ps-flex')(Flex);
