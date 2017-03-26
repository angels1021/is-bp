import express from 'express';
import path from 'path';
import open from 'open';  // eslint-disable-line
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack/webpack.dev.babel';
import { error, success } from '../tools/logger';
import { dllPath } from '../tools/paths';

/* eslint-disable no-console */
console.log('process.env dev', process.env.NODE_ENV);

try {
  const app = express();
  const PORT = 3000;

  // webpackConfig.output.publicPath = `http://localhost:${PORT}${webpackConfig.output.publicPath}`;

  const compiler = webpack(webpackConfig);

  const middleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    historyApiFallback: {
      rewrites: [{
        from: /\/(\d\.)?main\.js(\.map)?/,
        to: (context) => context.match[0]
      }]
    },
    silent: true,
    stats: 'errors-only'
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  const fs = middleware.fileSystem;

  app.get(/\.dll\.js$/, (req, res) => {
    const filename = req.path.replace(/^\//, '');
    res.sendFile(path.join(dllPath, filename));
  });

  app.get('*', (req, res) => {
    const filename = path.join(compiler.outputPath, 'index.html');
    fs.readFile(filename, (err, result) => {
      if (err) {
        res.sendStatus(404);
        console.log('get error', err);
        return err;
      }
      res.send(result.toString());
      return false;
    });
  });

  app.listen(PORT, (err) => {
    if (err) {
      error(err);
    } else {
      success(`app listening on port ${PORT}`);
    }
  });
} catch (ex) {
  error(ex);
}
