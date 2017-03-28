const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/AuthMiddleware');
const User = require('../controllers/user');

// API api/user/

router.route('/all')
  .get(User.getAll);

router.route('/profile')
  .get(AuthMiddleware.userIsLoggedIn, User.getProfile);

module.exports = router;
