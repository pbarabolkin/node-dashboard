'use strict';

var mongoose = require('mongoose-q')();
var Schema = mongoose.Schema;

var schema = new Schema({
  name: String,
  description: String,
  order: Number,
  statusId: Schema.ObjectId,
  priorityId: Schema.ObjectId,
  _assignee: {type: Schema.ObjectId, required: false, ref: 'User'},
  projectId: Schema.ObjectId
});

var Ticket = mongoose.model('Ticket', schema);

module.exports = Ticket;
