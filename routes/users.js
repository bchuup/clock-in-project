const express = require('express');
const router = express.Router();
// const knex = require('../db/knex');

router.get('/', function (req, res) {
  res.send({ users: 1 })
  // knex('users').then((users) => {
  //   res.send(users);
  // });
})

module.exports = router;