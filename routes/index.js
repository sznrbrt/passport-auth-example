const express = require('express');

const authRoutes = require('./auth');
const userRoutes = require('./users');
const vendorRoutes = require('./vendors');

const router = express.Router();

// => API /api/

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/vendor', vendorRoutes);

router.use('/', (req, res) => res.status(401).send('No route matched.'));

module.exports = router;
