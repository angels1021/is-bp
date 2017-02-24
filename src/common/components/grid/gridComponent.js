/* eslint-disable react/prefer-stateless-function */
import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import gridClasses from './gridClasses';

// small
// mSmall
// medium
// large
// xlarge
// xxlarge

const gridComponent = (...initialClasses) => (WrappedComponent) => {
  class FlexComponent extends Component {
    render() {
      const { children, align, direction, className, ...extraProps } = this.props;
      const reducedClasses = classNames(...[
        ...initialClasses,
        ...gridClasses(align, direction, className)
      ]);
      return (
        <WrappedComponent
          className={reducedClasses} {...extraProps}
        >{children}</WrappedComponent>
      );
    }
  }

  FlexComponent.propTypes = { // eslint-disable-line no-param-reassign
    align: PropTypes.string,
    direction: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node.isRequired
  };

  FlexComponent.defaultProps = {
    align: '',
    direction: '',
    className: ''
  };

  const wrappedName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  FlexComponent.displayName = `grid(${wrappedName})`;
  return FlexComponent;
};

export default gridComponent;
