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
        className={classes({
          'ps-select__actions': true,
          invalid: error && touched,
          valid: valid && !error
        })}
      />
      {error && <div className="callout alert"><small>{error}</small></div>}
    </div>
  </div>
);

const valueType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.bool
]);
/* eslint-disable react/require-default-props */
Select.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  reactSelect: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(React.PropTypes.shape({
    value: valueType,
    label: valueType
  })),
  label: valueType,
  plain: PropTypes.bool
};
/* eslint-enable react/require-default-props */

export default Select;
