const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/:userId', async (req, res) => {
  try {
    const requestedUserId = req.params.userId;
    const shifts = await knex.select().table('shifts').where({ user_id: requestedUserId });
    res.send(shifts);
  } catch (error) {
    return res.sendStatus(500)
  }
});

router.post('/:userId/new-shift', async (req, res) => {
  try {
    const existingUser = await knex('users').where({ id: req.params.userId }).first();
    if (existingUser) {
      const newShift = await knex('shifts').returning('*').insert({
        ...req.body
      });
      return res.status(200).send(newShift)
    } else {
      return res.sendStatus(404)
    }
  } catch (error) {
    return res.sendStatus(500)
  }
})



module.exports = router;