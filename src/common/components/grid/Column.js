import React, { PropTypes } from 'react';

const Column = ({ children, className }) => (
  <div className={`column ${className}`} >{children}</div>
);

Column.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

Column.defaultProps = {
  className: ''
};

export default Column;
