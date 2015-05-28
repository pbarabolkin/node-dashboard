'use strict';

var express = require('express');
var controller = require('./user.controller.js');
var auth = require('../../components/auth/helpers');

var router = express.Router();

router.get('/', auth.ensureAuthenticated, controller.getUsers);

module.exports = router;
