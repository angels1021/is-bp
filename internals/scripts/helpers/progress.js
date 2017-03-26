import readline from 'readline';
import chalk from 'chalk';

/**
 * Adds an animated progress indicator
 *
 * @param  {string} message      The message to write next to the indicator
 * @param  {number} amountOfDots The amount of dots you want to animate
 */
export default function animateProgress(message, amountOfDots) {
  if (typeof amountOfDots !== 'number') {
    amountOfDots = 3; // eslint-disable-line no-param-reassign
  }

  let i = 0;
  return setInterval(() => {
    readline.cursorTo(process.stdout, 0);
    i = (i + 1) % (amountOfDots + 1);
    const dots = new Array(i + 1).join('.');
    process.stdout.write(chalk.blue(message + dots));
  }, 500);
}
