import jsonServer from 'json-server';
import path from 'path';
import { error, success } from '../tools/logger';

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, './api/db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// use '/login', '/logout', '/register'

server.listen(3001, (err) => {
  if (err) {
    error('JSON Server failed');
    error(err);
  } else {
    success('JSON Server is running on port 3001');
  }
});
