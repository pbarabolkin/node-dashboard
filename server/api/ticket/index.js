'use strict';

var express = require('express');
var controller = require('./ticket.controller.js');
var auth = require('../../components/auth/helpers');

var router = express.Router();

router.get('/:projectId?', auth.ensureAuthenticated, controller.getTickets);
router.get('/:id', auth.ensureAuthenticated, controller.get);
router.post('/', auth.ensureAuthenticated, controller.save);

module.exports = router;
