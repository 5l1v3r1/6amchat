'use strict';

module.exports = function(app, config) {
  var auth  = require('./controllers/auth')(config),
      queue = require('./controllers/queue'),
      api   = require('./middlewares/api');

  var apiAuth = [api.requiresLogin, api.onlyJSON];

  app.post('/login', api.onlyJSON, auth.login);
  app.post('/logout', apiAuth, auth.logout);

  app.post('/api/queue/:vlineUserId', apiAuth, queue.postUser);
  app.del('/api/queue/:vlineUserId', apiAuth, queue.delUser);

  app.param('vlineUserId', api.loadVlineUserId);

  app.get('/', function(req, res) {
    res.render('chat');
  });
};