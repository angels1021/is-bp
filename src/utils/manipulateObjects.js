/**
 * lodash style tools for manipulating object types
 */

export const NestRecursive = (set, initialValue) => (
  set.reduceRight((col, key) => {
    const obj = {};
    obj[key] = col;
    return obj;
  }, initialValue)
);
