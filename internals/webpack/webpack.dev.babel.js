import webpack from 'webpack';
import { existsSync as exists, readFileSync as read } from 'fs';
import cheerio from 'cheerio';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import PreloadWebpackPlugin from 'preload-webpack-plugin';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import configWebpack from './webpack.base.babel';
import { appSrc, appHTML, base } from '../tools/paths';
import { error as printError } from '../tools/logger';
import { entryName, manifestPath } from '../config/dll.config';

/**
 * Select which plugins to use to optimize the bundle's handling of
 * third party dependencies.
* */
function dependencyHandlers() {
  // Don't do anything during the DLL Build step
  if (process.env.BUILDING_DLL) { return []; }

  if (!exists(manifestPath)) {
    printError('The DLL manifest is missing. Please run `npm run build:dll`');
    process.exit(0);
  }

  return [
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require(manifestPath) // eslint-disable-line global-require
    })
  ];
}

/**
 * We dynamically generate the HTML content in development so that the
 * DLL Javascript file is loaded in script tags and available to our application.
 */
function templateContent() {
  const html = read(appHTML).toString();
  const doc = cheerio(html);
  doc.find('body')
    .append(`<script data-dll='true' src='/${entryName}.dll.js'></script>`);

  return doc.toString();
}

export default configWebpack({
  entry: {
    main: [
      'webpack-hot-middleware/client?reload=true',
      `${appSrc}/app`
    ]
  },
  output: {
    publicPath: base,
    filename: '[name].js',
    hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
    hotUpdateMainFilename: 'hot/[hash].hot-update.json',
    chunkFilename: '[name].[id].js'
  },
  translations: { filter: 'noDescription' },
  cssOpts: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
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
  plugins: dependencyHandlers().concat([
    new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
    // extract css to a .css file rather than a <style> block
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: false
    }),
    // inject js and css files into html
    new HtmlWebpackPlugin({
      inject: true,
      templateContent: templateContent(),
      chunks: ['vendor', 'main']
    }),
    new PreloadWebpackPlugin({
      rel: 'prefetch',
      as: 'script',
      include: ['route.CR']
    }),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin()
  ]),
  devtool: 'inline-source-map'
});
