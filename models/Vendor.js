const mongoose = require('mongoose');
const jwt =  require('jsonwebtoken');
const moment = require('moment');

const config = require('../config/server');

const vendorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

vendorSchema.methods.makeToken = function() {
  let token = jwt.sign({
    _id: this._id,
    exp: moment().add(1, 'week').unix() // in seconds
  }, config.JWT_SECRET);

  return token;
};

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
