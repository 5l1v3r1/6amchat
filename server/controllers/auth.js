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
    var subject = serviceId + ':' + userId;
    var payload = {'iss': serviceId, 'sub': subject, 'exp': expiry};
    var apiSecretKey = base64urlDecode(apiSecret);
    return jwt.encode(payload, apiSecretKey);
  }

  function createToken(userId) {
    var serviceId = config.vline.serviceId;
    var apiSecret = config.vline.apiSecret;
    var exp = new Date().getTime() + (48 * 60 * 60);

    return createAuthToken(serviceId, userId, exp, apiSecret);
  }

  auth.login = function (req, res) {
    var userToken = req.body.userToken, userId = parseInt(req.body.fbUserId);

    console.yellow('Login request made');

    if (userToken) {
      console.yellow('Polling FB to validate userToken');

      var url = "https://graph.facebook.com/debug_token?input_token=" + userToken;
      url += "&access_token=" + config.facebook.clientID + "|" + config.facebook.clientSecret;

      http(url, function(error, response, body) {
        if (error) {
          res.send(404);
        }
        else {
          var data = JSON.parse(body).data;

          if (data.is_valid && data.user_id === userId) {
            console.yellow('userToken is valid – generating authToken');

            res.cookie('isAuthenticated', 'true', { signed: true });
            res.json({ authToken: createToken(data.user_id) });
          }
          else {
            console.yellow(data.error.message);
            res.send(401);
          }
        }
      })
    }
    else {
      console.yellow("No userToken");
      res.send(400);
    }
  };

  auth.logout = function (req, res) {
    console.yellow("authentication cookied clear");
    res.clearCookie('isAuthenticated');
    return res.send(200);
  };

  return auth;
}
