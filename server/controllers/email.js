'use strict';


module.exports = function(config) {
  var sendgrid = require('sendgrid')(config.sendgrid.apiUser, config.sendgrid.apiKey),
      email    = {};

  email.reminder = function(req, res) {
    var email = {
      subject: 'Reminder to Self: Check out 6amchat.com',
      from: 'matt@6amchat.com',
      fromname: '6AM Chat',
      html: "<a href='6amchat.com'>6amchat.com</a>",
      date: new Date(),
      to: req.body.email
    };

    sendgrid.send(email, function(err, json) {
      if (err) {
        console.red('Reminder not sent: ' + err);
        return res.send(400);
      }
      console.yellow('Reminder sent. Data: ', json);
      return res.send(200);
    });

  };

  return email;
}