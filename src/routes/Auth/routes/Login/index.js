/*
* Login page
* */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// lang
import { FormattedMessage } from 'react-intl';
import { loginRequest } from 'api/login/actions';
import { selectRequestLoading, selectRequestErrors } from 'common/containers/App/selectors';
import { createRequestId } from 'api/fetchAll/utils';
// global components
import Row from 'common/components/grid/Row';
import Column from 'common/components/grid/Column';
import Flex from 'common/components/grid/Flex';
// local components
import LoginForm from './components/LoginFrom';
// local lang
import messages from './login.messages';

const requestId = createRequestId(`${messages.PAGE}Page`);

export class Login extends Component {

  constructor(props, context) {
    super(props, context);

    this._onSubmit = this._onSubmit.bind(this);
  }

  _onSubmit(formMap, _, formProps) {
    const { valid, pristine } = formProps;
    if (!pristine && valid) {
      const formObj = formMap.toObject();
      this.props.login(formObj);
    }
  }

  render() {
    console.log('loading', this.props.loading(requestId));
    console.log('error', this.props.error(requestId));
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
  login: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired,
  error: PropTypes.func.isRequired
};

Login.defaultProps = {
  login: () => {},
  loading: false,
  error: {}
};

// Login.propTypes = {
//   username: PropTypes.string.isRequired,
//   password: PropTypes.string.isRequired,
//   location: PropTypes.string.isRequired,
//   code: PropTypes.string.isRequired
// };
//
const mapStateToProps = createStructuredSelector({
  loading: selectRequestLoading(),
  error: selectRequestErrors()
});

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(loginRequest(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
