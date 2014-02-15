/*jslint node: true */
'use strict';

var express = require('express');
require("termcolor").define(); // for console.logging w/ colors

var env = process.env.NODE_ENV || 'dev',
    config = require('./config')[env];

var app = express();
require('./express')(app, config);

require('./routes')(app, config);

// module.exports = app;
var port = process.env.PORT || 3000;
app.listen(port);
console.yellow('Express server listening on port ' + port);