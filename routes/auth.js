const express = require('express');
const passport = require('passport');
const Auth = require('../controllers/auth');

const router = express.Router();

// API api/auth/

router.route('/user/register')
  .post(Auth.userRegister);

router.route('/user/login')
  .post(passport.authenticate('user-local', { session: false }), Auth.login);

router.route('/vendor/register')
  .post(Auth.vendorRegister);

router.route('/vendor/login')
  .post(passport.authenticate('vendor-local', { session: false }), Auth.login);

module.exports = router;
