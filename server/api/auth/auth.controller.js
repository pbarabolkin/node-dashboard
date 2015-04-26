'use strict';

var util = require('util');

exports.login = function (req, res) {
  req.checkBody('email', 'valid email required').isEmail();
  req.checkBody('password', 'valid password required').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    res.send('There have been validation errors: ' + util.inspect(errors), 400);
    return;
  }

  if (req.body.email && req.body.password) { //TODO: call DB here
    var test = req.body.remember;
    res.json('ok');
  } else {
    res.json('error');
  }
};

exports.logout = function (req, res) {
  res.json('ok');
};
