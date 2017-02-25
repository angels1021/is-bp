import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';

import Input from 'common/components/Forms/Input';
import Select from 'common/components/Forms/Select';
import Row from 'common/components/grid/Row';
import Flex from 'common/components/grid/Flex';
import { initialState as initialValues } from 'api/login/constants';

const optionValue = (option) => option && option.value;

const options = [
  {
    value: '/',
    label: 'Register'
  },
  {
    value: '/ms',
    label: 'Management system'
  }
];

const LoginForm = ({ onSubmit, handleSubmit }) => (
  <form
    name="loginForm"
    id="loginForm"
    className="ps-flex column small-12"
    onSubmit={handleSubmit(onSubmit)}
  >
    <Row align="justify" direction="column" className="collapse is-collapse-child" >
      <Flex className="column shrink" direction="column">
        <Row>
          <Field component={Input} type="text" name="username" placeholder="Username" />
        </Row>
        <Row>
          <Field component={Input} type="password" name="password" placeholder="Password" />
        </Row>
        <Row>
          <Field
            component={Select}
            name="location"
            normalize={optionValue}
            options={options}
            plain="true"
          />
        </Row>
        <Field component="input" type="hidden" name="code" />
      </Flex>
      <Flex align="center middle" className=" column shrink ps-flex">
        <button className="button primary">
          <span>
            Submit
          </span>
        </button>
      </Flex>
    </Row>
  </form>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'login',
  initialValues
})(LoginForm);
