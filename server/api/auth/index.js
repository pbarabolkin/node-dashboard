'use strict';

var express = require('express');
var controller = require('./auth.controller');

var router = express.Router();

router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.post('/signup', controller.signup);

module.exports = router;
