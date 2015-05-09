'use strict';

var mongoose = require('mongoose-q')();
var Schema = mongoose.Schema;

var schema = new Schema({
  email: String,
  fName: String,
  lName: String,
  password: String
});

var User = mongoose.model('User', schema);

module.exports = User;
