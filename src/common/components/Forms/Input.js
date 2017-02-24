import React, { PropTypes } from 'react';
import classes from 'classnames';

const Input = ({
  input = {},
  meta: { error, valid, touched },
  type = 'text',
  placeholder = '',
  label = false
}) => (
  <div className="small-12" >
    {label && <label htmlFor={input.name} >{label}</label>}
    <div>
      <input
        {...input}
        type={type}
        placeholder={placeholder}
        className={classes({
          invalid: error && touched,
          valid: valid && !error
        })}
      />
      {error && <div className="alert callout" ><small>{error}</small></div>}
    </div>
  </div>
);

const valueType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.bool
]);

Input.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['text', 'number', 'email', 'url', 'password', 'file']), // eslint-disable-line react/require-default-props
  placeholder: PropTypes.string, // eslint-disable-line react/require-default-props
  label: valueType // eslint-disable-line react/require-default-props
};

export default Input;
