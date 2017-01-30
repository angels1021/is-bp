import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import configWebpack from './webpack.base.config';
import { appSrc, appHTML } from '../tools/paths';

export default configWebpack({
  entry: [
    'webpack-hot-middleware/client?reload=true',
    appSrc
  ],
  output: {
    filename: '[name].js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: appHTML
    })
  ],
  devtool: 'inline-source-map'
});
