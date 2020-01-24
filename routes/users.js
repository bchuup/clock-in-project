const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res) {
  knex.select().table('users').then((users) => {
    console.log('users', users);
    res.send(users);
  })

})

module.exports = router;