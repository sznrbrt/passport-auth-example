'use strict';

const VendorDB = require('../models/Vendor');

const Vendor = {
  getAll: (req, res) => {
    VendorDB.find({}, (err, vendors) => {
      return res.status(err ? 400 : 200).send(err || vendors);
    });
  },

  getProfile: (req, res) => {
    return res.status(200).send(req.user);
  }
};

module.exports = Vendor;
