'use strict';

var express = require('express');
var controller = require('./project.controller.js');
var auth = require('../../components/auth/helpers');

var router = express.Router();

router.get('/', auth.ensureAuthenticated, controller.getProjects);
router.get('/:id', auth.ensureAuthenticated, controller.get);
router.post('/', auth.ensureAuthenticated, controller.save);

module.exports = router;
