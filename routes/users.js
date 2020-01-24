const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res) {
  knex.select().table('users').then((users) => {
    res.send(users);
  })
})
router.post('/', function (req, res) {
  console.log('req', req.body);
  // knex('books').insert().then(() => {})
  // knex.select().table('users').then((users) => {
  //   res.send(users);
  // })
})

module.exports = router;