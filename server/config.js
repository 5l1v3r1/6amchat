'use strict';

var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

module.exports = {
  dev: {
    root: rootPath,
    app: {
      name: '6AM Chat — Dev'
    },
    vline: {
      serviceId: '1000',
      apiSecret: 'Muiz678ynsPACMITXlcCUBoH2sBw3-rvTdU9X6q9ihw'
    }
  },
  production: {
    root: rootPath,
    app: {
      name: '6AM Chat'
    },
    vline: {
      serviceId: '1000',
      apiSecret: 'Muiz678ynsPACMITXlcCUBoH2sBw3-rvTdU9X6q9ihw'
    }
  }
};