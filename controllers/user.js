'use strict';

const UserDB = require('../models/User');

const User = {
  getAll: (req, res) => {
    UserDB.find({}, (err, users) => {
      return res.status(err ? 400 : 200).send(err || users);
    });
  },

  getProfile: (req, res) => {
    return res.status(200).send(req.user);
  }
};

module.exports = User;
