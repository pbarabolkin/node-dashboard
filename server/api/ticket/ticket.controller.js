'use strict';

var Ticket = require('../../data/models/ticket');

exports.getTickets = function (req, res, next) {
  req.checkQuery('projectId', 'projectId is invalid').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    return res.json(errors.map(function (error) {
      return error.msg;
    }), 400);
  }

  Ticket.findQ({projectId: req.query.projectId})
    .then(function (result) {
      return res.json(result);
    })
    .catch(function (err) {
      return res.json(err.message, 500);
    });
};

exports.get = function (req, res, next) {
  Ticket.findByIdQ(req.params.id)
    .then(function (result) {
      return res.json(result);
    })
    .catch(function (err) {
      return res.json(err.message, 500);
    });
};

exports.save = function (req, res, next) {
  req.checkBody('name', 'name is invalid').notEmpty();
  req.checkBody('priorities', 'priorities are invalid').isArray();
  req.checkBody('statuses', 'statuses are invalid').isArray();

  var errors = req.validationErrors();
  if (errors) {
    return res.json(errors.map(function (error) {
      return error.msg;
    }), 400);
  }

  if (req.body._id) {
    // update ticket

    Ticket.findByIdQ(req.body._id)
      .then(function (ticket) {
        ticket.name = req.body.name;
        ticket.priorities = req.body.priorities;
        ticket.statuses = req.body.statuses;

        saveTicket(ticket, res);
      })
      .catch(function (err) {
        return res.json(err.message, 500);
      });
  } else {
    // save new ticket

    var ticket = new Ticket({
      name: req.body.name,
      priorities: req.body.priorities,
      statuses: req.body.statuses
    });

    return saveTicket(ticket, res);
  }

  function saveTicket(ticket, res) {
    return ticket
      .saveQ()
      .then(function (result) {
        return res.json(result.name);
      })
      .catch(function (err) {
        return res.json(err.message, 500);
      });
  }
};
