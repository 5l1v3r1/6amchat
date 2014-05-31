'use strict';

angular.module('app.services.auth', [])
  .factory('auth', function($rootScope, $q, $http, videoChat) {

    var auth = {};

    auth.isLoggedIn = false, auth.isLoggingIn = false;

    function _errorCb() {
      $rootScope.$apply(function() {
        auth.isLoggingIn = false;
      });
    }

    auth.login = function() {
      if (!vline.Browser.supportsWebRtc() || !vline.Browser.supportsChat()) {
        videoChat.isSupported = false;
        mixpanel.track('Could Not Sign In: Brower not Supported');
      } else {
        mixpanel.track('Signed In');
        auth.isLoggingIn = true;
        $http.post('/login').success(function(data) {
          // connect bug: console.log('Calling videoChat#login in logged_into_fb callback');
          videoChat.login(data.authToken).then(
            function() {
              auth.isLoggingIn = false;
              auth.isLoggedIn  = true;
            }, _errorCb
          );
        }).error(_errorCb);
      }
    }.bind(auth);

    auth.logout = function() {
      videoChat.logout();
      $http.post('/logout');
      this.isLoggedIn = false;
    }.bind(auth);

    auth.logoutPermanently = function() {
      this.logout();
      videoChat.logoutClient();
    }.bind(auth);

    return auth;
  });