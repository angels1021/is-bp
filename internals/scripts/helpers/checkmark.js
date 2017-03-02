/**
 * Adds mark check symbol
 */

import chalk from 'chalk';

export default function addCheckMark(callback) {
  process.stdout.write(chalk.green(' ✓'));
  if (callback) callback();
}
