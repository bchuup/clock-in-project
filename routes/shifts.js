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
})

module.exports = router;