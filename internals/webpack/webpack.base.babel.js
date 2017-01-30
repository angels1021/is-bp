import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { alias, appSrc } from '../tools/paths';
import babelQuery from './babel.config';

// options =
// {
//    debug: webpack.debug,
//    stats: webpack.stats,
//    devtool: webpack.devtool
//    entry: webpack.entry,
//    output webpack.output,
//    babelQuery: webpack.modules.rules -> babel-loader query,
//    plugins: webpack.plugins.
//    alias: webpack.resolve.alias,
// }


const webpackSetup = (options) => ({
  stats: options.stats,
  entry: options.entry,
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  output: Object.assign({
    path: appSrc,
    publicPath: '/'
  }, options.output),
  module: {
    rules: [
      {
        test: /\.js$/, // Transform all .js files required somewhere with Babel
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: Object.assign({}, babelQuery, options.babelQuery)
          }
        ]
      },
      {
        test: /\.scss/,
        include: appSrc,
        use: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'image/svg-xml'
            }
          }
        ]
      },
      {
        test: /\.(png|gif|jpe?g)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 10000
            }
          },
          {
            loader: 'image-webpack',
            options: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '75-100',
                speed: 4
              }
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader'
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.(mp4|webm)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  plugins: options.plugins.concat([
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.NamedModulesPlugin()
  ]),
  resolve: {
    modules: ['src', 'node_modules'],
    mainFields: [
      'browser',
      'jsnext:main',
      'main'
    ],
    alias: Object.assign({}, alias, options.alias)
  }
});

export default webpackSetup;
