/**
 * definition object for dllplugin
 */
import { resolve } from 'path';
import { uniq, pullAll } from 'lodash';
import { dllPath } from '../tools/paths';

/**
 * exclude dependencies which are not intended for the browser
 * by listing them here.
 */
const exclude = [
  'chalk',
  'cross-env',
  'express',
  'ip',
  'cross-env',
  'foundation-sites'
];

/**
 * Specify any additional dependencies here. We include core-js and lodash
 * since a lot of our dependencies depend on them and they get picked up by webpack.
 */
const include = ['core-js', 'babel-polyfill', 'lodash'];

export const entryName = 'poseDependencies';

export const manifestPath = resolve(dllPath, `${entryName}.json`);

export function entry(pkg) {
  const dependencyNames = Object.keys(pkg.dependencies);
  const includeDependencies = uniq(dependencyNames.concat(include));
  return {
    [entryName]: pullAll(includeDependencies, exclude)
  };
}
