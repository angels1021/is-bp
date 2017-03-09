/**
 * Test Auth module container
 */
import React from 'react';
import { shallow } from 'enzyme';
import { Auth } from '../index';

describe('<Auth />', () => {
  it('should render the Auth module main container', () => {
    // arrange
    const child = (<h1>Christmasaurus</h1>);
    Auth.contextTypes = {
      store: React.PropTypes.object
    };
    // act
    const wrapper = shallow(
      (<Auth locale="en" messages={{ text: 'text' }}>
        {child}
      </Auth>)
    );
    // assert
    expect(wrapper.contains(child)).toBe(true);
    expect(wrapper.state('module')).toBe('auth');
    expect(wrapper.name()).toBe('LanguageProvider');
    expect(wrapper.find('.ps-page-container').length).toBe(1);
  });
});
