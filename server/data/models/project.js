'use strict';

var mongoose = require('mongoose-q')();
var Schema = mongoose.Schema;

var schema = new Schema({
  name: String,
  statuses: [{
    name: String
  }],
  priorities: [{
    name: String
  }]
});

var Project = mongoose.model('Project', schema);

module.exports = Project;
