import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';

// lang
import { FormattedMessage } from 'react-intl';
import { loginRequest } from 'api/login/actions';
// global components
import Row from 'common/components/grid/Row';
import Column from 'common/components/grid/Column';
import Flex from 'common/components/grid/Flex';
// local components
import LoginForm from './components/LoginFrom';
// local lang
import messages from './translations/login.messages';

class Login extends Component {

  constructor(props, context) {
    super(props, context);

    this._onSubmit = this._onSubmit.bind(this);
  }

  componentDidMount() {
    console.log('props', this.props);
    console.log('context', this.context);
  }

  _onSubmit(formMap, formDispatch, formProps) {
    const { valid, pristine } = formProps;
    if (!pristine && valid) {
      const formObj = formMap.toObject();
      this.props.login(formObj);
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
          <h1 className="text-center" >
            <FormattedMessage {...messages.title} />
          </h1>
        </Flex>
        <Row className="card-section collapse" >
          <LoginForm onSubmit={this._onSubmit} />
        </Row>
      </Column>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired
};

Login.defaultProps = {
  login: () => {}
};

// Login.propTypes = {
//   username: PropTypes.string.isRequired,
//   password: PropTypes.string.isRequired,
//   location: PropTypes.string.isRequired,
//   code: PropTypes.string.isRequired
// };
//
// const mapStateToProps = createStructuredSelector({
//   username: selectField('username'),
//   password: selectField('password'),
//   location: selectField('location'),
//   code: selectField('code')
// });

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(loginRequest(data))
});

export default connect(null, mapDispatchToProps)(Login);
