const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute'); // make sure use later
const oauth = require('../controllers/oauth');
const games = require('../controllers/games');
const users = require('../controllers/users');
const upload = require('../lib/upload');

router.get('/', (req, res) => res.render('statics/index'));

router.route('/users/:id')
  .get(users.show)
  .delete(users.delete);

router.route('/users/:id/edit')
  .get(users.edit)
  .post(users.update);

router.route('/games')
  .get(games.index)
  .post(games.create);

router.route('/games/new')
  .get(games.new);

router.route('/games/:id')
  .get(games.show)
  .put(games.update)
  .delete(secureRoute, games.deleteComment);

router.route('/games/:id/delete')
  .delete(games.delete);

router.route('/games/:id/attend')
  .post(games.going);

router.route('/games/:id/comments')
  .post(games.createComment);

router.route('/games/:id/comments/:commentId')
  .put(games.reply)
  .delete(games.deleteComment);

router.route('/register')
  .get(registrations.new)
  .post(upload.single('image'), registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/oauth/github')
  .get(oauth.github);

router.all('*', (req, res) => res.notFound());

module.exports = router;
