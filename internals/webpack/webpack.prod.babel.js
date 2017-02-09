import webpack from 'webpack';
import glob from 'glob';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import PurifyCSSPlugin from 'purifycss-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import PreloadWebpackPlugin from 'preload-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import configWebpack from './webpack.base.babel';
import { appSrc, appBuild, appHTML, prodAlias } from '../tools/paths';
import { isVendor } from '../tools/webpack-helpers';

export default configWebpack({
  devtool: 'source-map',
  entry: {
    main: `${appSrc}/index`
  },
  output: {
    path: appBuild,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].[id].js'
  },
  cssOpts: ExtractTextPlugin.extract({
    fallbackLoader: 'style-loader',
    loader: [
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          minimize: true,
          importLoaders: 2
        }
      },
      {
        loader: 'postcss-loader'
        // options for postcss are in postcss.config.js at root
        // browser compatibility is used my many tools and so is set in package.js
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }
    ]
  }),
  plugins: [
    new WebpackMd5Hash(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: isVendor
    }),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      allChunks: true
    }),
    new PurifyCSSPlugin({
      paths: glob.sync(`${appSrc}/**/*.js`),
      verbose: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        unused: true,
        dead_code: true, // big one--strip code that will never execute
        warnings: false, // good for prod apps so users can't peek behind curtain
        drop_debugger: true,
        conditionals: true,
        evaluate: true,
        drop_console: true, // strips console statements
        sequences: true,
        booleans: true
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: appHTML,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDocType: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttribute: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCss: true,
        minifyURL: true
      }
    }),
    new PreloadWebpackPlugin({
      rel: 'prefetch',
      as: 'script',
      include: ['route.CR']
    })
  ],
  alias: prodAlias
});
