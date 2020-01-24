const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', async (req, res) => {
  try {
    const users = await knex.select().table('users');
    res.send(users);
  } catch (error) {
    return res.sendStatus(500)
  }
})

router.post('/', async (req, res) => {
  try {
    const newName = req.body.name.toLowerCase().trim();
    const existingUser = await knex('users').where({ full_name: newName }).first();
    if (!existingUser) {
      const newUser = await knex('users').returning('*').insert({
        full_name: newName
      });
      return res.status(200).send(newUser)
    } else {
      return res.sendStatus(409)
    }
  } catch (error) {
    return res.sendStatus(500)
  }
});

module.exports = router;