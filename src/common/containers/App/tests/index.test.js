/**
 * Test our main App component
 */
import React from 'react';
import { shallow } from 'enzyme';
import App from '../index';

describe('<App /> node', () => {
  it('should render it\'s children', () => {
    // arrange
    const children = (<h1>pose</h1>);

    // act
    const renderedComponent = shallow(
      <App>
        {children}
      </App>
    );

    // assert
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
