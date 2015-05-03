'use strict';

var util = require('util'),
  passport = require('passport');

exports.login = function (req, res, next) {
  req.checkBody('email', 'valid email required').isEmail();
  req.checkBody('password', 'valid password required').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    res.send('There have been validation errors: ' + util.inspect(errors), 400);
    return;
  }

  passport.authenticate('local', function (err, user, info) {
    if (err)
      return next(err);

    if (!user) {
      req.session.messages = [info.message];
      res.json({
        error: 'Invalid email or password'
      });
      return;
    }

    req.logIn(user, function (err) {
      if (err)
        return next(err);

      if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 3;
      } else {
        req.session.cookie.expires = false;
      }

      res.json({
        username: user.username
      });
    });
  })(req, res, next);
};

exports.logout = function (req, res) {
  req.logout();
  res.json('ok');
};
