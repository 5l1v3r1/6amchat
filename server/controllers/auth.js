'use strict';

var http = require('request'),
    jwt  = require('green-jwt');

module.exports = function(config) {
  var auth = {};

  function base64urlUnescape(str) {
    str += Array(5 - str.length % 4).join('=');
    return str.replace(/\-/g, '+').replace(/_/g, '/');
  }

  function base64urlDecode(str) {
    return new Buffer(base64urlUnescape(str), 'base64');
  }

  function createAuthToken(serviceId, userId, expiry, apiSecret) {
    var subject      = serviceId + ':' + userId;
    var payload      = {'iss': serviceId, 'sub': subject, 'exp': expiry};
    var apiSecretKey = base64urlDecode(apiSecret);
    return jwt.encode(payload, apiSecretKey);
  }

  function createToken() {
    var userId    = Math.random().toString(36).substr(2, 9);
    var serviceId = config.vline.serviceId;
    var apiSecret = config.vline.apiSecret;
    var exp       = new Date().getTime() + (48 * 60 * 60);

    return createAuthToken(serviceId, userId, exp, apiSecret);
  }

  auth.login = function (req, res) {
    console.yellow('Login request made');

    res.cookie('isAuthenticated', 'true', { signed: true });
    res.json({ authToken: createToken() });
  };

  auth.logout = function (req, res) {
    console.yellow("authentication cookied clear");
    res.clearCookie('isAuthenticated');
    return res.send(200);
  };

  return auth;
}
