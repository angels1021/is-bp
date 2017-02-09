import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router/es';
import Button from 'components/Button';
import './style/style.scss';

export default class CR extends Component {

  render() {
    return (
      <div>
        Im CR
        <nav>
          <Link to="cr/customers" >customers</Link>
        </nav>
        <Button>primary</Button>
        <Button>secondary</Button>
        <Button>submit</Button>
        <Button>error</Button>
        <Button>link</Button>
        <div className="cr-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

CR.propTypes = {
  children: PropTypes.object
};

CR.defaultProps = {
  children: PropTypes.object
};
