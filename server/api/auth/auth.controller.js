'use strict';

var util = require('util'),
  passport = require('passport'),
  User = require('../../data/models/user');

exports.login = function (req, res, next) {
  req.checkBody('email', 'valid email required').isEmail();
  req.checkBody('password', 'valid password required').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    return res.json(errors.map(function (error) {
      return error.msg;
    }), 400);
  }

  passport.authenticate('local', function (err, user, info) {
    if (err)
      return next(err);

    if (!user) {
      req.session.messages = [info.message];
      return res.json({
        errors: 'Invalid email or password'
      });
    }

    req.logIn(user, function (err) {
      if (err)
        return next(err);

      if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 3;
      } else {
        req.session.cookie.expires = false;
      }

      return res.json({
        name: user.fName
      });
    });
  })(req, res, next);
};

exports.logout = function (req, res) {
  req.logout();
  return res.json();
};

exports.signup = function (req, res) {
  req.checkBody('email', 'valid email required').isEmail();
  req.checkBody('fName', 'first name required').notEmpty();
  req.checkBody('lName', 'last name required').notEmpty();
  req.checkBody('password', 'password required').notEmpty();
  req.checkBody('cPassword', 'confirm password required').notEmpty();
  req.checkBody('cPassword', 'Passwords do not match').equals(req.body.password);
  var errors = req.validationErrors();
  if (errors) {
    return res.json(errors.map(function (error) {
      return error.msg;
    }), 400);
  }

  User.findOneQ({email: req.body.email})
    .then(function (result) {
      if (result)
        return res.json('User with this email exists', 400);

      var user = new User({
        email: req.body.email,
        fName: req.body.fName,
        lName: req.body.lName,
        password: req.body.password
      });

      return user.saveQ()
        .then(function (result) {
          return res.json();
        });
    })
    .catch(function (err) {
      return res.json(err, 500);
    });
};
