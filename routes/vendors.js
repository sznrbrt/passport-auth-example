const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/AuthMiddleware');

const Vendor = require('../controllers/vendor');

// API api/vendor/

router.route('/all')
  .get(Vendor.getAll);

router.route('/profile')
  .get(AuthMiddleware.vendorIsLoggedIn, Vendor.getProfile);

module.exports = router;
