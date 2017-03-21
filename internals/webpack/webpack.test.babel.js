/**
 * TEST WEBPACK CONFIGURATION
 */

import webpack from 'webpack';
import { alias } from '../tools/paths';

const moduleDirectory = Object.keys(alias).map((path) => `src/${path.replace('$', '')}`);

const modules = [
  'src',
  'node_modules',
  ...moduleDirectory
];

export default {
  devtool: 'inline-source-map',
  module: {
    // Some libraries don't like being run through babel.
    // If they gripe, put them here.
    noParse: [
      /node_modules(\\|\/)sinon/,
      /node_modules(\\|\/)acorn/
    ],
    rules: [
      // { test: /\.json$/, loader: 'json-loader' } -> not needed in webpack 2
      { test: /\.sass/, loader: 'null-loader' },

      // sinon.js--aliased for enzyme--expects/requires global vars.
      // imports-loader allows for global vars to be injected into the module.
      // See https://github.com/webpack/webpack/issues/304
      { test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
        use: {
          loader: 'imports-loader',
          options: {
            define: false,
            require: false
          }
        }
      },
      { test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.messages.js$/,
        use: [
          {
            loader: 'messages-loader',
            options: {
              filter: 'id' // match production
            }
          }
        ]
      },
      { test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
        use: { loader: 'null-loader' }
      }
    ]
  },

  plugins: [

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })],

  // Some node_modules pull in Node-specific dependencies.
  // Since we're running in a browser we have to stub them out. See:
  // https://webpack.github.io/docs/configuration.html#node
  // https://github.com/webpack/node-libs-browser/tree/master/mock
  // https://github.com/webpack/jade-loader/issues/8#issuecomment-55568520
  node: {
    fs: 'empty',
    child_process: 'empty',
    net: 'empty',
    tls: 'empty'
  },

  // required for enzyme to work properly
  externals: {
    jsdom: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window'
  },
  resolve: {
    modules,
    alias: {
      // required for enzyme to work properly
      sinon: 'sinon/pkg/sinon'
    }
  }
};
