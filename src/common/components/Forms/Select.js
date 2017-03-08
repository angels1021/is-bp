import React, { PropTypes } from 'react';
import classes from 'classnames';
import ReactSelect from 'react-select';

const reactSelectPlain = {
  multi: false,
  searchable: false,
  clearable: false
};

const reactSelectDefaultOpts = (plain, reactSelect) => (
  plain ? { ...reactSelect, ...reactSelectPlain } : reactSelect
);

const Select = ({
  input = {},
  meta: { error, valid, touched },
  options = [],
  label = false,
  placeholder = '',
  plain = false,
  reactSelect = {}
}) => (
  <div className="small-12" >
    {label && <label htmlFor={input.name} >{label}</label>}
    <div>
      <ReactSelect
        {...input}
        {...reactSelectDefaultOpts(plain, reactSelect)}
        label={false} // always false so our label will be used
        options={options}
        placeholder={placeholder}
        className={classes({
          'ps-select__actions': true,
          invalid: error && touched,
          valid: valid && touched && !error
        })}
      />
      {error && touched && <div className="callout alert"><small>{error}</small></div>}
    </div>
  </div>
);

const valueType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.bool
]);

const selectOptionType = PropTypes.shape({
  value: valueType,
  label: valueType
});
/* eslint-disable react/require-default-props */
Select.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  reactSelect: PropTypes.object,
  options: PropTypes.arrayOf(selectOptionType).isRequired,
  label: valueType,
  placeholder: valueType,
  plain: PropTypes.oneOf([true, false, 'true', 'false', 1, 0])
};
/* eslint-enable react/require-default-props */

export default Select;
