import React, { PropTypes } from 'react';
import '../../style/components/buttons.scss';

const Button = ({ children }) => (
  <button type="button" className={`ps-btn ps-btn--${children}`} >
    <span>{children}</span>
  </button>
);

Button.propTypes = {
  children: PropTypes.string.isRequired
};

export default Button;
