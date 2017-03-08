/**
 * Test gridComponent HOC Component
 */
/* eslint-disable react/prop-types */
import React from 'react';
import { shallow } from 'enzyme';
import gridComponent from '../gridComponent';

describe('gridComponent HOC Component', () => {
  // arrange
  const childrenNode = (<h1>hello</h1>);
  const WrappedComponent = ({ children, className }) => (<div className={className} >{children}</div>);
  const GridComponent = gridComponent('initialClass')(WrappedComponent);
  // act
  const renderedComponent = shallow(
    <GridComponent align="middle center" direction="column" className="otherClass andAnother" >
      {childrenNode}
    </GridComponent>
  );
  it('should contain passed in children', () => {
    // assert
    expect(renderedComponent.contains(childrenNode)).toBe(true);
  });
  it('should include the initial class', () => {
    // assert
    expect(renderedComponent.hasClass('initialClass')).toBe(true);
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
