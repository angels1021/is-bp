import jsonServer from 'json-server';
import path from 'path';
import { error as logError, success } from '../tools/logger';
import { setUserToken, getUserByUsername } from './api';

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
    // let user = getUserByUsername(username);
    // if (user && (user.password === password)) {
    //   const token = new Date().getTime();
    //   user = setUserToken(user.id, token);
    //   if (!user) res.jsonp(false);
    //   const cleanUser = { ...user };
    //   delete cleanUser.password;
    //   delete cleanUser.username;
    //   res.jsonp(cleanUser);
    // } else {
    //   res.jsonp(false);
    // }
  });

server.route('/logout')
  .post((req, res) => {
    const { userId } = req.body;
    setUserToken(userId, null)
      .then((user) => {
        res.jsonp(user && user.id);
      })
      .catch((error) => { res.jsonp({ error }); });
    // const user = setUserToken(userId, null);
    // if (user && user.id) {
    //   res.jsonp(user.id);
    // } else {
    //   res.jsonp(new Error(`user ${userId} not found`));
    // }
  });
// server.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   getUserByUsername(username)
//     .then((users) => {
//       const user = users && users[0];
//       if (user && (user.password === password)) {
//         const cleanUser = { ...user };
//         delete cleanUser.password;
//         delete cleanUser.username;
//         res.jsonp(cleanUser);
//       } else {
//         res.jsonp(false);
//       }
//     })
//     .catch(() => {
//       res.jsonp(false);
//     });
// });

server.use(router);

server.listen(PORT, (err) => {
  if (err) {
    logError('JSON Server failed');
    logError(err);
  } else {
    success(`JSON Server is running on port ${PORT}`);
  }
});
