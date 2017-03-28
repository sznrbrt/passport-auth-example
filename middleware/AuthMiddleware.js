const User = require('../models/User');
const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const config = require('../config/server');

const AuthMiddleware = {
  isAuthorized: (role) => {
    return (req, res, next) => {
      if(!req.user) return res.status(403).send({ err: 'Unauthorized action!' });
      if(role !== req.user.role) return res.status(400).send({ err: 'Unauthorized action!' });
      next();
    }
  },

  userIsLoggedIn: (req, res, next) => {
    let token = req.cookies.accessToken;
    jwt.verify(token, config.JWT_SECRET, (err, payload) => {
      if(err) return res.status(401).send({error: 'Must be authenticated.'});
      User
        .findById(payload._id)
        .select({password: false})
        .exec((err, user) => {
          if(err || !user) {
            return res.status(400).send(err || {error: 'User not found.'});
          }

          req.user = user;
          next();
        })
    })
  },

  vendorIsLoggedIn: (req, res, next) => {
    let token = req.cookies.accessToken;
    jwt.verify(token, config.JWT_SECRET, (err, payload) => {
      if(err) return res.status(401).send({error: 'Must be authenticated.'});
      Vendor
        .findById(payload._id)
        .select({password: false})
        .exec((err, vendor) => {
          if(err || !vendor) {
            return res.status(400).send(err || {error: 'Vendor not found.'});
          }

          req.user = vendor;
          next();
        })
    })
  }
};


module.exports = AuthMiddleware;
