import { isString } from 'lodash-es';

const gridAlign = new Set([
  'left',
  'right',
  'center',
  'justify',
  'spaced',
  'top',
  'bottom',
  'middle',
  'stretch',
  'self-top',
  'self-bottom',
  'self-middle',
  'self-stretch'
]);

const gridDirection = new Set(['row', 'row-reverse', 'column', 'column-reverse']);

/**
 *
 * Reduce all classes passed to single array.
 * align and direction classes will be prefixed
 * according to the grid and direction sets.
 *
 * @param {string} align classes to be prefixed according gridAlign
 * @param {string} direction classes to be prefixed according gridDirection
 * @param {...rest} classes
 * @return {Array}
 */
const buildClasses = (align, direction, ...classes) => {
  const alignArr = align ? align.split(' ') : [];
  const alignClasses = align ? alignArr.reduce((collection, val) => {
    if (gridAlign.has(val)) collection.push(`align-${val}`);
    return collection;
  }, []) : [];

  const alignDirection = direction ? direction.split(' ').reduce((collection, val) => {
    if (gridDirection.has(val)) collection.push(`flex-dir-${val}`);
    return collection;
  }, alignClasses) : alignClasses;

  return !classes
    ? alignDirection
    : classes.reduce((collection, val) => {
      if (isString(val)) collection.push(val);
      return collection;
    }, alignDirection);
};


export default buildClasses;
