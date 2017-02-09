import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack/webpack.dev.babel';
import { appSrc } from '../tools/paths';

let compiler = "";
try {
  compiler = webpack(webpackConfig);
  const app = express();
  const PORT = 3000;

  const middleware = webpackDevMiddleware(compiler, {
    stats: {colors: true},
    publicPath: webpackConfig.output.publicPath,
    historyApiFallback: true,
    silent: false
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(appSrc));
  app.get('*', (req, res) => {
    const filename = path.join(compiler.outputPath,'index.html');
    compiler.outputFileSystem.readFile(filename, function(err, result){
      if (err) {
        return next(err);
      }
      res.set('content-type','text/html');
      res.send(result);
      res.end();
    });
  });

  app.listen(PORT, (err) => {
    if (err) {
      console.log('error', err);
    } else {
      console.log(`app listening on port ${PORT}`);
      //open(`http://localhost:${PORT}`);
    }
  });
} catch(ex) {
  console.log('*** exception ***', ex);

}
