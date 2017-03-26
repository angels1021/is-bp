/**
 * WEBPACK DLL
 * cache webpack's module contexts for external dependencies
 * which will usually not change often enough to warrant
 * building them from scratch every time we use the webpack process.
 */

import webpack from 'webpack';
import { join } from 'path';
import { entry } from '../config/dll.config';
import { appPackage, dllPath } from '../tools/paths';
import configWebpack from './webpack.base.babel';

const pkg = require(appPackage);

export default configWebpack({
  context: process.cwd(),
  entry: entry(pkg),
  devtool: 'eval',
  output: {
    filename: '[name].dll.js',
    path: dllPath,
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({ name: '[name]', path: join(dllPath, '[name].json') })
  ]
});
