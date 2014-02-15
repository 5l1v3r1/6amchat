'use strict';

var express = require('express');

module.exports = function (app, config) {

  app.set('showStackError', true);

  // NTD: should be placed before express.static
  // app.use(express.compress({
  //   filter: function (req, res) {
  //     return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
  //   },
  //   level: 9
  // }));

  app.use(express.static(config.root + '/app'));
  app.use(express.static(config.root + '/.tmp'));
  app.use(express.favicon());

  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');

  app.use(express.logger('dev'));

  app.configure(function() {
    // cookieParser should be above session
    app.use(express.cookieParser('thisisafuckingsecret'));

    // json and urlencoded should be above methodOverride
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());

    // adds CSRF support
    // NTD: app.use(express.csrf());

    // NTD: app.use(function(req, res, next) {
    //   res.locals.csrf_token = req.csrfToken();
    //   next();
    // });

    // routes should be at the last
    app.use(app.router);

    // assume 404 since no middleware responded
    app.use(function(req, res) {
      res.status(404);
    });
  });
};