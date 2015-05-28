'use strict';

var User = require('../../data/models/user');

exports.getUsers = function (req, res, next) {
  User.findQ({})
    .then(function (result) {
      return res.json(result);
    })
    .catch(function (err) {
      return res.json(err.message, 500);
    });
};
