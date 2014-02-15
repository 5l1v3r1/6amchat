'use strict';

angular.module('bonfireApp.services.facebook', [])
  .factory('facebook', function($rootScope, $window, $q) {
    var facebook = {};

    $window.fbAsyncInit = function () {
      FB.init({
        appId:'493236667462235',
        status: true,
        cookie: true
      });

      FB.Event.subscribe('auth.authResponseChange', function(response) {
        if (response.status === 'connected') {
          $rootScope.$broadcast('logged_into_fb', response.authResponse);
        } else if (response.status === 'not_authorized') {
          // NTD: my app isn't authorized for user's fb
        } else {
          // NTD
        }
      });
    };

    (function(d){
      var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement('script'); js.id = id; js.async = true;
      js.src = "//connect.facebook.net/en_US/all.js";
      ref.parentNode.insertBefore(js, ref);
    }(document));

    facebook.login = function() {
      // NTD: look into if there's a way to check if session exists
      // and if one exists, then the login dialog doesn't need to show up again
      var q = $q.defer();

      FB.login(function(response) {
        if (response) {
          q.resolve();
        } else {
          q.reject();
        }
      });

      return q.promise;
    }.bind(facebook);

    facebook.logout = function() {
      FB.logout();
    }.bind(facebook);

    return facebook;
  });