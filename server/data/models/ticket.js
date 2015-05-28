'use strict';

var mongoose = require('mongoose-q')();
var Schema = mongoose.Schema;

var schema = new Schema({
  name: String,
  description: String,
  order: Number,
  statusId: Schema.ObjectId,
  priorityId: Schema.ObjectId,
  assigneeId: Schema.ObjectId,
  projectId: Schema.ObjectId
});

var Ticket = mongoose.model('Ticket', schema);

module.exports = Ticket;
