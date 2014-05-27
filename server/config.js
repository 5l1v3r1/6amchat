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
    },
    sendgrid: {
      apiUser: '6amchat',
      apiKey: 'vYDbDVgz9txU[gQuBeyq'
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
    },
    sendgrid: {
      apiUser: '6amchat',
      apiKey: 'vYDbDVgz9txU[gQuBeyq'
    }
  }
};