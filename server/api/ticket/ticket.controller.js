'use strict';

var Ticket = require('../../data/models/ticket'),
  _ = require('lodash'),
  Q = require('q');

exports.getTickets = function (req, res, next) {
  req.checkParams('projectId', 'projectId is invalid').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    return res.json(errors.map(function (error) {
      return error.msg;
    }), 400);
  }

  Ticket.findQ({projectId: req.params.projectId}, null, {sort: {name: 1}})
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
  req.checkBody('description', 'description is invalid').notEmpty();
  req.checkBody('statusId', 'statusId is invalid').notEmpty();
  req.checkBody('priorityId', 'priorityId is invalid').notEmpty();
  req.checkBody('assigneeId', 'assigneeId is invalid').notEmpty();
  req.checkBody('projectId', 'projectId is invalid').notEmpty();

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
        ticket.description = req.body.description;
        ticket.statusId = req.body.statusId;
        ticket.priorityId = req.body.priorityId;
        ticket.assigneeId = req.body.assigneeId;

        saveTicket(ticket, res);
      })
      .catch(function (err) {
        return res.json(err.message, 500);
      });
  } else {
    // save new ticket

    var ticket = new Ticket({
      name: req.body.name,
      description: req.body.description,
      order: 0,
      statusId: req.body.statusId,
      priorityId: req.body.priorityId,
      assigneeId: req.body.assigneeId,
      projectId: req.body.projectId
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

exports.updateOrders = function (req, res, next) {
  if (!_.isArray(req.body))
    return res.json(['parameters are invalid'], 400);

  return Q.all(req.body.map(updateOrder))
    .then(function (results) {
      return res.json();
    })
    .catch(function (err) {
      return res.json(err.message, 500);
    });

  function updateOrder(item) {
    Ticket.findByIdQ(item._id)
      .then(function (ticket) {
        ticket.statusId = item.statusId;
        ticket.order = item.order;
        return ticket.saveQ();
      });
  }
};
