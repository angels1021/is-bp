/**
 * Test Column Component
 */
import React from 'react';
import { shallow } from 'enzyme';
import Column from '../Column';

describe('<Column /> Component', () => {
  // arrange
  const children = (<h1>hello</h1>);
  // act
  const renderedComponent = shallow(
    <Column className="otherClass andAnother" >
      {children}
    </Column>
  );
  it('should contain passed in children', () => {
    // assert
    expect(renderedComponent.contains(children)).toBe(true);
  });
  it('should have class .column', () => {
    // assert
    expect(renderedComponent.hasClass('column')).toBe(true);
  });
  it('should include any additional classes passed in', () => {
    // assert
    expect(renderedComponent.hasClass('otherClass')).toBe(true);
    expect(renderedComponent.hasClass('andAnother')).toBe(true);
  });
});
