import path from 'path';
import fs from 'fs';

// Make sure any symlinks in the project folder are resolved:
const appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

export const base = resolveApp('/');
export const appSrc = resolveApp('src');
export const appBuild = resolveApp('dist');
export const appHTML = resolveApp('src/index.html');
export const buildHTML = resolveApp('dist/index.html');
export const appPackage = resolveApp('package.json');
export const testsSetup = resolveApp('internals/scripts/setupTests.js');
export const dllPath = resolveApp('internals/config/dllPlugin');
export const appNodeModules = resolveApp('node_modules');

/* eslint-disable quote-props */

export const alias = {
  'api$': resolveApp('src/api'),
  'utils$': resolveApp('src/utils'),
  'i18n$': resolveApp('src/i18n'),
  'common$': resolveApp('src/common')
};

export const prodAlias = {
  'react$': resolveApp('node_modules/react/dist/react.min.js'),
  'react-dom$': resolveApp('node_modules/react-dom/dist/react-dom.min.js')
};
