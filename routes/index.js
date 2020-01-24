const express = require('express');
const router = express.Router();
const usersRoute = require('./users');
const shiftsRoute = require('./shifts');

// TODO for routes
// make proper error messages whenever you cant find user etc (can put inside middleware)
router.use('/users', usersRoute);
router.use('/shifts', shiftsRoute);

module.exports = router;