'use strict';

var Project = require('../../data/models/project');

exports.getProjects = function (req, res, next) {
  Project.findQ({})
    .then(function (result) {
      return res.json(result);
    })
    .catch(function (err) {
      return res.json(err.message, 500);
    });
};

exports.get = function (req, res, next) {
  Project.findByIdQ(req.params.id)
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
    // update project

    Project.findByIdQ(req.body._id)
      .then(function (project) {
        project.name = req.body.name;
        project.priorities = req.body.priorities;
        project.statuses = req.body.statuses;

        saveProject(project, res);
      })
      .catch(function (err) {
        return res.json(err.message, 500);
      });
  } else {
    // save new project

    var project = new Project({
      name: req.body.name,
      priorities: req.body.priorities,
      statuses: req.body.statuses
    });

    return saveProject(project, res);
  }

  function saveProject(project, res) {
    return project
      .saveQ()
      .then(function (result) {
        return res.json(result.name);
      })
      .catch(function (err) {
        return res.json(err.message, 500);
      });
  }
};
