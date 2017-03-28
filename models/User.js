const mongoose = require('mongoose');
const jwt =  require('jsonwebtoken');
const moment = require('moment');

const config = require('../config/server');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.methods.makeToken = function() {
  let token = jwt.sign({
    _id: this._id,
    exp: moment().add(1, 'week').unix() // in seconds
  }, config.JWT_SECRET);

  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
