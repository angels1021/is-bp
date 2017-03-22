import React, { PropTypes } from 'react';
import { injectIntl, intlShape } from 'react-intl';

const Button = ({
  intl,
  text = '',
  icon = false,
  busy = false,  // todo create button loader component
  color = 'secondary',
  type = 'button'
}) => (
  <button type={type} className={`button ${color}`} disabled={busy} >
    <span>
      {!busy &&
      (<span>
        {icon && <span>{icon}</span>}
        {text && <span>{intl.formatMessage(text)}</span>}
      </span>)
      }
      {busy && <span>loader</span>}
    </span>
  </button>
);

/* eslint-disable react/require-default-props */
Button.propTypes = {
  intl: intlShape.isRequired,
  text: PropTypes.object, // intl define messages shape
  type: PropTypes.oneOf(['button', 'submit']),
  icon: PropTypes.string, // todo create icon component
  busy: PropTypes.bool,
  color: PropTypes.oneOf(['secondary', 'primary', 'success', 'alert', 'warning', 'info', 'text'])
};

export default injectIntl(Button);
