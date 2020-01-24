const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res) {
  knex.select().table('users').then((u) => {
    console.log('users', u);
    res.send(u);

  })
  // knex('users').then((users) => {
  // });
})

module.exports = router;