'use strict';

var ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  else {
    res.status(401);
    res.json('Unauthorized');
  }
};

module.exports.ensureAuthenticated = ensureAuthenticated;
