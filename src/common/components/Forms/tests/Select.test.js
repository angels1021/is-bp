/**
 * Test Select component
 */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Select from '../Select';

// label
// error
// error !touched
// plain true
// plain false

describe('<Select />', () => {
  let defaults;
  beforeEach(() => {
    defaults = {
      input: { name: 'testInput' },
      meta: { error: '', valid: false, touched: false },
      options: [
        { value: 'superman', label: 'sups' },
        { value: 'batman', label: 'bats' }
      ]
    };
  });
  describe('default', () => {
    it('should render with default options', () => {
      // act
      const wrapper = shallow(<Select {...defaults} />);
      // assert
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render a Select component with default options', () => {
      // act
      const wrapper = shallow(<Select {...defaults} />);
      const reactSelectWrapper = wrapper.find('Select');
      // assert
      expect(reactSelectWrapper.length).toBe(1);  // ReactSelect exists
      expect(toJson(reactSelectWrapper)).toMatchSnapshot(); // verify snapshot
      expect(reactSelectWrapper.prop('label')).toBe(false); // label prop on ReactSelect should always be prop
      expect(reactSelectWrapper.prop('options')).toEqual(defaults.options); // pass options down
      expect(wrapper.find('label').length).toBe(0); // label shouldn't exist
      expect(wrapper.find('.alert').length).toBe(0); // error shouldn't exist
    });
  });

  describe('with label', () => {
    it('should render a label element if label text is passed', () => {
      // arrange
      const opts = { ...defaults, label: 'Winner' };
      // act
      const wrapper = shallow(
        <Select {...opts} />
      );
      const labelWrapper = wrapper.find('label');
      // assert
      expect(labelWrapper.length).toBe(1);
      expect(labelWrapper.text()).toBe('Winner');
      expect(labelWrapper.prop('htmlFor')).toBe('testInput');
    });
  });

  describe('with error', () => {
    // arrange
    let opts;
    let wrapper;
    it('should render the error element and add class invalid if an meta.error is passed', () => {
      // arrange
      opts = { ...defaults, meta: { error: 'batman', valid: false, touched: true } };
      // act
      wrapper = shallow(
        <Select {...opts} />
      );
      const errorWrapper = wrapper.find('.alert');
      // assert
      expect(errorWrapper.length).toBe(1);
      expect(errorWrapper.text()).toBe('batman');
      expect(wrapper.find('Select').hasClass('invalid')).toBe(true);
    });
    it('should not render the error element if an meta.touched is false', () => {
      // arrange
      wrapper.setProps({ meta: { error: 'batman', valid: false, touched: false } });
      // act
      const errorWrapper = wrapper.find('.alert');
      // assert
      expect(errorWrapper.length).toBe(0);
      expect(wrapper.find('Select').hasClass('invalid')).toBe(false);
    });
    it('should not add the valid class if meta.valid is true but meta.error is passed', () => {
      // arrange
      wrapper.setProps({ meta: { error: 'batman', valid: true, touched: true } });
      // assert
      expect(wrapper.find('Select').hasClass('invalid')).toBe(true);
      expect(wrapper.find('Select').hasClass('valid')).toBe(false);
    });
    it('should add the valid class if meta.valid is true', () => {
      // arrange
      wrapper.setProps({ meta: { error: false, valid: true, touched: true } });
      // assert
      expect(wrapper.find('Select').hasClass('valid')).toBe(true);
    });

    it('should not add the valid class if meta.valid is true but meta.touched is false', () => {
      // arrange
      wrapper.setProps({ meta: { error: false, valid: true, touched: false } });
      // assert
      expect(wrapper.find('Select').hasClass('valid')).toBe(false);
    });
  });

  describe('plain prop', () => {
    // arrange
    let opts;
    let wrapper;
    it('should pass non plain props to <ReactSelect /> by default', () => {
      // arrange
      opts = {
        ...defaults,
        reactSelect: { multi: true, label: true, otherOption: true }
      };
      // act
      wrapper = shallow(
        <Select {...opts} />
      );
      const reactSelectWrapper = wrapper.find('Select');
      // assert
      expect(reactSelectWrapper.prop('multi')).toBe(true); // passed to ReactSelect
      expect(reactSelectWrapper.prop('otherOption')).toBe(true); // passed to ReactSelect either way
      expect(reactSelectWrapper.prop('label')).toBe(false); // should have been overridden
    });

    it('should override non-plain reactSelect options if plain is set to true', () => {
      // arrange
      wrapper.setProps({ plain: true });
      // act
      const reactSelectWrapper = wrapper.find('Select');
      // assert
      expect(reactSelectWrapper.prop('multi')).toBe(false); // should have been overridden
      expect(reactSelectWrapper.prop('otherOption')).toBe(true); // passed to ReactSelect either way
      expect(reactSelectWrapper.prop('label')).toBe(false); // should have been overridden
    });
  });
});
