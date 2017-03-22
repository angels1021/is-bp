/**
 * Test index
 */
import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../components/Login';

describe('<Login /> container', () => {
  let wrapper;
  const props = {
    login: jest.fn(),
    loading: jest.fn(() => false),
    error: jest.fn(() => {})
  };
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
});
