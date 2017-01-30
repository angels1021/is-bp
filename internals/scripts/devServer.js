process.env.NODE_ENV = 'development';
import express from 'express';
import open from 'open';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack/webpack.dev.config';
import { appHTML } from '../tools/paths';

let compiler = "";
try {
  compiler = webpack(webpackConfig);
  const app = express();
  const PORT = 3000;

  const middleware = webpackDevMiddleware(compiler, {
    stats: 'errors-only',
    publicPath: webpackConfig.output.publicPath,
    silent: false
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  app.get('*', (req, res) => {
    res.sendFile(appHTML);
  });

  app.listen(PORT, (err) => {
    if (err) {
      console.log('error', err);
    } else {
      console.log(`app listening on port ${PORT}`);
      open(`http://localhost:${PORT}`);
    }
  });
} catch(ex) {
  console.log('*** exception ***', ex);

}
