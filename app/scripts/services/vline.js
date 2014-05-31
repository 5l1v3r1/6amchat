'use strict';

angular.module('app.services.vline', [])
  .factory('vline', function($rootScope, $q) {

        var _SERVICE_ID = '1000', options = { serviceId: _SERVICE_ID };
        // can't call var vline because that's already taken from vendor/vline.js
        var vlineService = {};

        vlineService.session = null, vlineService.userId  = null;

        vlineService.client = vline.Client.create(options);

        vlineService.login = function(authToken) {
          var self = this, client = self.client;
          var q = $q.defer();

          // connect bug: console.log('vline#login: client is logged in?', client.isLoggedIn());
          if (client.isLoggedIn()) {
            // connect bug: if (!client.isConnected()) client.connect();

            var session = client.getDefaultSession();
            var userId  = session.getLocalPersonId();

            self.session = session;
            self.userId  = userId;

            // connect bug: console.log('vline#login: client is connected?', client.isConnected());
            q.resolve();
          } else {
            client.login(_SERVICE_ID, {}, authToken).
              done(function(session) {
                self.session = session;
                self.userId  = session.getLocalPersonId();
                q.resolve();
              }).
              fail(function(err) {
                q.reject();
              });
          }

          return q.promise;
        }.bind(vlineService);

        vlineService.logout = function() {
          this.session = null;
          this.userId = null;
          var client = this.client;
          client.logout();
        }.bind(vlineService);

        return vlineService;
      });