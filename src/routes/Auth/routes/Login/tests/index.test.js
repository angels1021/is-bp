/**
 * Test index
 */
import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../index';

describe('<Login /> container', () => {
  let wrapper;
  const props = {
    login: jest.fn(),
    loading: jest.fn(() => false),
    error: jest.fn(() => {})
  };
  const toObject = jest.fn(() => {});
  beforeEach(() => {
    wrapper = shallow(<Login {...props} />);
  });
  it('should render correctly', () => {
    // assert
    expect(wrapper).toMatchSnapshot();
  });
  it('should include the <LoginForm />', () => {
    // arrange
    const formWrapper = wrapper.find('ReduxForm');
    // assert
    expect(formWrapper.length).toBe(1);
  });
  it('should stop _onSubmit if form is invalid', () => {
    // arrange
    const fakeInstance = wrapper.instance();
    const formProps = { valid: false, pristine: false };
    // assert
    expect(fakeInstance).toBeInstanceOf(Login);
    // act
    fakeInstance._onSubmit({ toObject }, null, formProps);
    // assert
    expect(toObject).not.toHaveBeenCalled();
    expect(props.login).not.toHaveBeenCalled();
  });
  it('should stop _onSubmit if form is pristine', () => {
    // arrange
    const formProps = { valid: true, pristine: true };
    // act
    wrapper.instance()._onSubmit({ toObject }, null, formProps);
    // assert
    expect(toObject).not.toHaveBeenCalled();
    expect(props.login).not.toHaveBeenCalled();
  });
  it('should run _onSubmit if form is valid', () => {
    // arrange
    const formProps = { valid: true, pristine: false };
    // act
    wrapper.instance()._onSubmit({ toObject }, null, formProps);
    // assert
    expect(toObject).toHaveBeenCalled();
    expect(props.login).toHaveBeenCalled();
  });
});
