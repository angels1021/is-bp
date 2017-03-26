/**
 * create dll plugin manifest.
 */
if (process.env.NODE_ENV === 'production') {
  process.exit(0);
}
/* eslint-disable import/first */
import { mkdir, echo, exec } from 'shelljs';
import { existsSync as exists, writeFile } from 'fs';
import path from 'path';
import { appPackage, dllPath } from '../tools/paths';

const pkg = require(appPackage);
const dllManifestPath = path.join(dllPath, 'package.json');

mkdir('-p', dllPath);

echo('Building the Webpack DLL...');

/**
 * Create a manifest so npm install doesn't warn us
 */
if (!exists(dllManifestPath)) {
  writeFile(
    dllManifestPath,
    JSON.stringify({
      name: 'pose-dlls',
      private: true,
      author: pkg.author,
      repository: pkg.repository,
      version: pkg.version
    }, null, 2),
    'utf8'
  );
}

// the BUILDING_DLL env var is set to avoid confusing the development environment
exec('cross-env BUILDING_DLL=true webpack --display-chunks --color --config internals/webpack/webpack.dll.babel.js');
