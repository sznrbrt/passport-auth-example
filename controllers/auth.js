'use strict';

const UserDB = require('../models/User');
const VendorDB = require('../models/Vendor');
const bcrypt = require('bcryptjs');

const Auth = {
  userRegister: (req, res) => {
    let userObj = req.body;

    UserDB.findOne({ username: userObj.username }, (err0, dbUser) => {
      if(err0 || dbUser) return res.status(400).send({ error: err0 || 'Username not available.' });
      bcrypt.hash(userObj.password, 12, (err1, hash) => {
        if(err1) return res.status(400).send(err1);

        let user = new UserDB({
          username: userObj.username,
          password: hash
        });

        user.save((err2) => {
          res.status(err2 ? 400 : 200).send(err2 || { message: "Successful registration!"});
        })
      })
    })
  },

  vendorRegister: (req, res) => {
    let vendorObj = req.body;

    UserDB.findOne({ email: vendorObj.email }, (err0, dbVendor) => {
      if(err0 || dbVendor) return res.status(400).send({ error: err0 || 'Email not available.' });
      bcrypt.hash(vendorObj.password, 12, (err1, hash) => {
        if(err1) return res.status(400).send(err1);

        let vendor = new VendorDB({
          email: vendorObj.email,
          password: hash
        });

        vendor.save((err2) => {
          res.status(err2 ? 400 : 200).send(err2 || { message: "Successful registration!"});
        })
      })
    })
  },
  
  login: (req, res) => {
    let token = req.user.makeToken();

    return res.cookie('accessToken', token).send('Logged in!');
  }
};

module.exports = Auth;
