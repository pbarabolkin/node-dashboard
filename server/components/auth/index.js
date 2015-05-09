'use strict';

var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('../../data/models/user');

module.exports = function (app) {
  // Passport session setup.
  //   To support persistent login sessions, Passport needs to be able to
  //   serialize users into and deserialize users out of the session.  Typically,
  //   this will be as simple as storing the user ID when serializing, and finding
  //   the user by ID when deserializing.
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    User.findByIdQ(id)
      .then(function (result) {
        if (result)
          return done(null, result);
        else
          return done(new Error('User ' + id + ' does not exist'));
      });
  });


  // Use the LocalStrategy within Passport.
  //   Strategies in passport require a `verify` function, which accept
  //   credentials (in this case, a username and password), and invoke a callback
  //   with a user object.  In the real world, this would query a database;
  //   however, in this example we are using a baked-in set of users.
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    function (email, password, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {

        // Find the user by email.  If there is no user with the given
        // email, or the password is not correct, set the user to `false` to
        // indicate failure and set a flash message.  Otherwise, return the
        // authenticated `user`.
        User.findOneQ({email: email})
          .then(function (result) {
            if (!result)
              return done(null, false, {message: 'Unknown user ' + email});

            if (result.password != password)
              return done(null, false, {message: 'Invalid password'});

            return done(null, result);
          })
          .catch(function (err) {
            return done(err);
          });
      });
    }
  ));
};
