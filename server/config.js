'use strict';

var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

module.exports = {
  dev: {
    root: rootPath,
    app: {
      name: 'Bonfire — Dev'
    },
    facebook: {
      clientID: "493236667462235",
      clientSecret: "0256e393ae14766c3fcbdc337cdd1f07"
    },
    vline: {
      serviceId: '1000',
      apiSecret: 'Muiz678ynsPACMITXlcCUBoH2sBw3-rvTdU9X6q9ihw'
    }
  },
  production: {
    root: rootPath,
    app: {
      name: 'Bonfire'
    },
    facebook: {
      clientID: "493236667462235",
      clientSecret: "0256e393ae14766c3fcbdc337cdd1f07"
    },
    vline: {
      serviceId: '1000',
      apiSecret: 'Muiz678ynsPACMITXlcCUBoH2sBw3-rvTdU9X6q9ihw'
    }
  }
};