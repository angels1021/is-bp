/* eslint-disable no-console */
import jsf from 'json-schema-faker';
import path from 'path';
import fs from 'fs';
import { schema } from './mockDataSchema';
import { error, success } from '../tools/logger';

const dbPath = path.join(__dirname, './api/db.json');

/* eslint-disable no-param-reassign */
jsf.extend('faker', (faker) => {
  const wasUsed = new Set();
  const isFirst = (key) => {
    const first = !wasUsed.has(key);
    if (first) wasUsed.add(key);
    return first;
  };
  faker.ps = {
    userName() {
      if (isFirst('userName')) {
        return 'Tom';
      }
      return faker.internet.userName();
    },
    password() {
      if (isFirst('password')) {
        return 'tomMcFly1';
      }
      return faker.internet.password(8);
    },
    firstName() {
      if (isFirst('firstName')) {
        return 'Tom';
      }
      return faker.name.firstName();
    },
    lastName() {
      if (isFirst('lastName')) {
        return 'Fletcher';
      }
      return faker.name.lastName();
    },
    role() {
      if (isFirst('role')) {
        return 'admin';
      }
      return faker.random.arrayElement(['admin', 'manager', 'cashier']);
    }
  };
  return faker;
});

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
