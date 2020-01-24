const express = require('express');
const router = express.Router();
const usersRoute = require('./users');
const shiftsRoute = require('./shifts');

router.use('/users', usersRoute);
router.use('/shifts', shiftsRoute);

module.exports = router;