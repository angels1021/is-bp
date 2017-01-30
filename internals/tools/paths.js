import path from 'path';
import fs from 'fs';


// Make sure any symlinks in the project folder are resolved:
const appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

export const appSrc = resolveApp('src');
export const appBuild = resolveApp('dist');
export const appHTML = resolveApp('src/index.html');
export const appPackageJson = resolveApp('package.json');
export const testsSetup = resolveApp('internals/scripts/setupTests.js');
export const appNodeModules = resolveApp('node_modules');

//aliases
// utils
// translations
// components
// containers

export const alias = {
  'utils$': resolveApp('src/utils'),
  'i18n$': resolveApp('src/i18n'),
  'components$': resolveApp('src/components'),
  'containers$': resolveApp('src/containers'),
};

export const prodAlias = {
  'react$': resolveApp('node_modules/react/dist/react.min.js'),
  'react-dom$': resolveApp('node_modules/react-dom/dist/react-dom.min.js'),
};
