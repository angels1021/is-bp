/**
 * Test Input component
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Input from '../Input';

describe('<Input />', () => {
  let options;
  beforeEach(() => {
    options = {
      input: { name: 'testInput' },
      meta: { error: '', valid: false, touched: false },
      type: 'text',
      placeholder: '',
      label: false
    };
  });
  describe('default', () => {
    it('should render correctly with default options', () => {
      // act
      const wrapper = shallow(
        <Input input={options.input} meta={options.meta} />
      );
      // assert
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render an input with default options', () => {
      const wrapper = shallow(
        <Input input={options.input} meta={options.meta} />
      );
      const inputWrapper = wrapper.find('input');
      // assert
      expect(toJson(inputWrapper)).toMatchSnapshot();
      expect(inputWrapper.length).toBe(1);
      expect(wrapper.find('label').length).toBe(0);
      expect(wrapper.find('.alert').length).toBe(0);
      expect(inputWrapper.get(0).props.type).toBe('text');
      expect(inputWrapper.get(0).props.placeholder).toBe('');
      expect(inputWrapper.hasClass('invalid')).toBe(false);
      expect(inputWrapper.hasClass('valid')).toBe(false);
    });
  });
  describe('with label', () => {
    it('should render a label element if label text is passed', () => {
      // arrange
      const opts = { ...options, label: 'Kal-El' };
      // act
      const wrapper = shallow(
        <Input {...opts} />
      );
      const labelWrapper = wrapper.find('label');
      // assert
      expect(labelWrapper.length).toBe(1);
      expect(labelWrapper.text()).toBe('Kal-El');
      expect(labelWrapper.prop('htmlFor')).toBe('testInput');
    });
  });

  describe('with error', () => {
    // arrange
    let opts;
    let wrapper;
    it('should render the error element and add class invalid if an meta.error is passed', () => {
      opts = { ...options, meta: { error: 'batman', valid: false, touched: true } };
      // act
      wrapper = shallow(
        <Input {...opts} />
      );
      const inputWrapper = wrapper.find('input');
      const errorWrapper = wrapper.find('.alert');
      // assert
      expect(errorWrapper.length).toBe(1);
      expect(errorWrapper.text()).toBe('batman');
      expect(inputWrapper.hasClass('invalid')).toBe(true);
    });
    it('should not render the error element if an meta.touched is false', () => {
      // arrange
      wrapper.setProps({ meta: { error: 'batman', touched: false, valid: false } });
      // act
      const inputWrapper = wrapper.find('input');
      const errorWrapper = wrapper.find('.alert');
      // assert
      expect(errorWrapper.length).toBe(0);
      expect(inputWrapper.hasClass('invalid')).toBe(false);
    });
    it('should not add the valid class if meta.valid is true but meta.error is passed', () => {
      // arrange
      wrapper.setProps({ meta: { error: 'batman', valid: true, touched: true } });
      // act
      const inputWrapper = wrapper.find('input');
      // assert
      expect(inputWrapper.hasClass('invalid')).toBe(true);
      expect(inputWrapper.hasClass('valid')).toBe(false);
    });
    it('should add the valid class if meta.valid is true', () => {
      // arrange
      wrapper.setProps({ meta: { valid: true, touched: true, error: false } });
      // act
      const inputWrapper = wrapper.find('input');
      // assert
      expect(inputWrapper.hasClass('valid')).toBe(true);
    });

    it('should not add the valid class if meta.valid is true but meta.touched is false', () => {
      // arrange
      wrapper.setProps({ meta: { valid: true, touched: false, error: false } });
      // act
      const inputWrapper = wrapper.find('input');
      // assert
      expect(inputWrapper.hasClass('valid')).toBe(false);
    });
  });
});
