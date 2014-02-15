'use strict';

angular.module('bonfireApp.services.auth', [])
  .factory('auth', function($rootScope, $q, facebook, $http, videoChat) {

    var auth = {};

    auth.isLoggedIn = false, auth.isLoggingIn = false;

    function _errorCb() {
      $rootScope.$apply(function() {
        auth.isLoggingIn = false;
      });
    }

    $rootScope.$on('logged_into_fb', function(e, authResponse) {
      auth.isLoggingIn = true;
      $http.post('/login', {
        userToken: authResponse.accessToken,
        fbUserId:  authResponse.userID
      }).success(function(data) {
        // connect bug: console.log('Calling videoChat#login in logged_into_fb callback');
        videoChat.login(data.authToken).then(
          function() {
            auth.isLoggingIn = false;
            auth.isLoggedIn  = true;
          }, _errorCb
        );
      }).error(_errorCb);
    })

    auth.login = function() {
      facebook.login().catch(_errorCb);
    }.bind(auth);

    auth.logout = function() {
      facebook.logout();
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