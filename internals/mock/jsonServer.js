import jsonServer from 'json-server';
import path from 'path';
import fetch from 'node-fetch';
import { error, success } from '../tools/logger';

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, './api/db.json'));
const middlewares = jsonServer.defaults();
const PORT = 3001;
const apiUrl = `http://localhost:${PORT}`;
server.use(middlewares);

server.use(jsonServer.bodyParser);

server.post('/login', (req, res) => {
  const { username, password } = req.body;
  fetch(`${apiUrl}/users?username=${username}`)
    .then((data) => data.json())
    .then((users) => {
      const user = users && users[0];
      if (user && (user.password === password)) {
        const cleanUser = { ...user };
        delete cleanUser.password;
        delete cleanUser.username;
        res.jsonp(cleanUser);
      } else {
        res.jsonp(false);
      }
    })
    .catch(() => {
      res.jsonp(false);
    });
});

server.use(router);

server.listen(PORT, (err) => {
  if (err) {
    error('JSON Server failed');
    error(err);
  } else {
    success(`JSON Server is running on port ${PORT}`);
  }
});
