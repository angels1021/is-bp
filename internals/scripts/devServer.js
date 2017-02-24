import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack/webpack.dev.babel';
import { appSrc } from '../tools/paths';
import { error, success } from '../tools/logger';

console.log('process.env dev', process.env.NODE_ENV);

let compiler = "";
try {

  const app = express();
  const PORT = 3000;

  //webpackConfig.output.publicPath = `http://localhost:${PORT}${webpackConfig.output.publicPath}`;

  compiler = webpack(webpackConfig);

  const middleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    historyApiFallback: {
      rewrites: [{
        from: /\/(\d\.)?main\.js(\.map)?/,
        to: context => context.match[0]
      }]
    },
    silent: true,
    stats: 'errors-only'
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  const fs = middleware.fileSystem;

  app.get('*', (req, res) => {
    const filename = path.join(compiler.outputPath,'index.html');
    fs.readFile(filename, function(err, result){
      if (err) {
        res.sendStatus(404);
        console.log('get error', err);
        return err;
      }
      res.send(result.toString());
    });
  });

  app.listen(PORT, (err) => {
    if (err) {
      error(err);
    } else {
      success(`app listening on port ${PORT}`);
    }
  });
} catch(ex) {
  error(ex);
}
