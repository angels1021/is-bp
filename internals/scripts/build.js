/* eslint-disable no-console */
import chalk from 'chalk';
import webpack from 'webpack';
import config from '../webpack/webpack.prod.babel';

console.log(chalk.blue('Generating minified bundle for production via webpack. this will take a moment'));

webpack(config).run((err, stats) => {
  if (err) { // stop here in case of fatal error
    console.log('error'.red, err.red);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.err.forEach((error) => console.log(error.red));
  }

  if (jsonStats.hasWarnings) {
    console.log(chalk.bold.yellow('webpack generated the following warnings: '));
    return jsonStats.warnings.forEach((warning) => console.log(chalk.yellow(warning)));
  }

  console.log('Webpack stats:', stats);

  // if we got this far, build succeeded.
  console.log(chalk.green('Ypur app has been compiled in production mode and written to /dist. it\'s ready to roll'));

  return 1;
});
