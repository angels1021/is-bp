/**
 * Test Row Component
 */
import React from 'react';
import { shallow } from 'enzyme';
import Row from '../Row';

describe('<Row /> Component', () => {
  // arrange
  const children = (<h1>hello</h1>);
  // act
  const renderedComponent = shallow(
    <Row align="middle center" direction="column" className="otherClass andAnother" >
      {children}
    </Row>
  );
  it('should contain passed in children', () => {
    // assert
    expect(renderedComponent.contains(children)).toBe(true);
  });
  it('should have class .row', () => {
    // assert
    expect(renderedComponent.hasClass('row')).toBe(true);
  });
  it('should have alignment class matching the passed align prop', () => {
    // assert
    expect(renderedComponent.hasClass('align-middle')).toBe(true);
    expect(renderedComponent.hasClass('align-center')).toBe(true);
    expect(renderedComponent.hasClass('align-right')).toBe(false);
  });
  it('should have direction class matching the passed in direction prop', () => {
    // assert
    expect(renderedComponent.hasClass('flex-dir-column')).toBe(true);
    expect(renderedComponent.hasClass('flex-dir-row')).toBe(false);
  });
  it('should include any additional classes passed in', () => {
    // assert
    expect(renderedComponent.hasClass('otherClass')).toBe(true);
    expect(renderedComponent.hasClass('andAnother')).toBe(true);
  });
});
