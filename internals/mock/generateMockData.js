/* eslint-disable no-console */
import jsf from 'json-schema-faker';
import path from 'path';
import fs from 'fs';
import { schema } from './mockDataSchema';
import { error, success } from '../tools/logger';

const dbPath = path.join(__dirname, './api/db.json');

if (fs.existsSync(dbPath)) {
  success('Mock data already exists.');
} else {
  const json = JSON.stringify(jsf(schema));

  fs.writeFile(dbPath, json, (err) => {
    if (err) {
      error(err);
    } else {
      success('Mock data generated successfully');
    }
  });
}

