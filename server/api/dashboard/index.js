'use strict';

var express = require('express');
var controller = require('./dashboard.controller');
var auth = require('../../components/auth/helpers');

var router = express.Router();

router.get('/', auth.ensureAuthenticated, controller.getDashboard);

module.exports = router;
