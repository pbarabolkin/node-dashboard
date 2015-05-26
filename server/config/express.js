/**
 * Express configuration
 */

'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var expressValidator = require('express-validator');
var passport = require('passport');

module.exports = function (app) {
  var env = app.get('env');

  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('appPath', config.root + '/public');
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', 'client');
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }

  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(expressValidator({
    customValidators: {
      isArray: function (value) {
        return Array.isArray(value);
      }
    }
  })); // this line must be immediately after express.bodyParser()!
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(expressSession({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  }));
  // Initialize Passport!  Also use passport.session() middleware, to support persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
};
