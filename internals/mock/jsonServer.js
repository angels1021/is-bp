import jsonServer from 'json-server';
import path from 'path';
import { error as logError, success } from '../tools/logger';
import { setUserToken, getUserByUsername, getLocale } from './api';

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, './api/db.json'));
const middlewares = jsonServer.defaults();
const PORT = 3001;
server.use(middlewares);

server.use(jsonServer.bodyParser);

server.route('/login')
  .post((req, res) => {
    const { username, password } = req.body;
    getUserByUsername(username)
      .then((found) => {
        const user = found && found[0];
        if (user && user.password === password) {
          const token = new Date().getTime();
          return setUserToken(user.id, token);
        }
        return false;
      }).then((user) => {
        res.jsonp(user && user.id ? user : false);
      })
      .catch(() => { res.jsonp(false); });
  });

server.route('/logout')
  .post((req, res) => {
    const { userId } = req.body;
    setUserToken(userId, null)
      .then((user) => {
        res.jsonp(user && user.id);
      })
      .catch((error) => { res.jsonp({ error }); });
  });

server.route('/locale/:localeKey')
  .get((req, res) => {
    const { modulePath } = req.query;
    const { localeKey } = req.params;
    try {
      const getModules = JSON.parse(modulePath);
      Promise.all(getModules.map((module) => getLocale(localeKey, module)))
        .then((found) => { res.jsonp(found); })
        .catch((error) => { res.jsonp({ error }); });
    } catch (error) {
      res.jsonp({ error, message: 'try/catch error' });
    }
  });

server.use(router);

server.listen(PORT, (err) => {
  if (err) {
    logError('JSON Server failed');
    logError(err);
  } else {
    success(`JSON Server is running on port ${PORT}`);
  }
});
