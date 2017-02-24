import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loginRequest } from 'api/login/actions';
// global components
import Row from 'common/components/grid/Row';
import Column from 'common/components/grid/Column';
import Flex from 'common/components/grid/Flex';
// local components
import LoginForm from './components/LoginFrom';

import { selectField } from './selectors';

class Login extends Component {

  constructor(props, context) {
    super(props, context);

    this._onSubmit = this._onSubmit.bind(this);
  }

  _onSubmit(form, formProps) {
    const { valid, touched } = formProps;
    if (touched && valid) {
      const name = form.get('username');
      console.log('form submit', name);
    }
  }

  render() {
    return (
      <Column
        className={`
        small-12
        m-small-6
        medium-4
        large-3
        ps-login-card card`}
      >
        <Flex align="center" className="card-section ps-shrink" >
          <h1 className="text-center" >Login</h1>
        </Flex>
        <Row className="card-section collapse" >
          <LoginForm onSubmit={this._onSubmit} />
        </Row>
      </Column>
    );
  }
}

Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired
};

Login.defaultProps = {
  username: '',
  password: '',
  location: '/',
  code: ''
};

const mapStateToProps = createStructuredSelector({
  username: selectField('username'),
  password: selectField('password'),
  location: selectField('location'),
  code: selectField('code')
});

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(loginRequest(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
