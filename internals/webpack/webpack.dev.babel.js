import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import PreloadWebpackPlugin from 'preload-webpack-plugin';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import configWebpack from './webpack.base.babel';
import { appSrc, appHTML } from '../tools/paths';
import { isVendor } from '../tools/webpack-helpers';

export default configWebpack({
  entry: {
    main: [
      'webpack-hot-middleware/client?reload=true',
      appSrc
    ]
  },
  output: {
    filename: '[name].js',
    hotUpdateChunkFilename: '[name].[id].js',
    chunkFilename: '[name].[id].js'
  },
  cssOpts: ExtractTextPlugin.extract({
    fallbackLoader: 'style-loader',
    loader: [
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
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
    new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
    // extract css to a .css file rather than a <style> block
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: isVendor
    }),
    // inject js and css files into html
    new HtmlWebpackPlugin({
      inject: true,
      template: appHTML,
      chunks: ['vendor', 'main']
    }),
    new PreloadWebpackPlugin({
      rel: 'prefetch',
      as: 'script',
      include: ['route.CR']
    }),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin()
  ],
  devtool: 'inline-source-map'
});
