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

router.put('/:userId/edit/:shiftId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const shiftId = req.params.shiftId;
    const existingUser = await knex('users').where({ id: userId }).first();
    const existingShift = await knex('shifts').where({ id: shiftId }).first();
    if (existingUser && existingShift) {
      const newShift = await knex('shifts').where({
        id: req.params.shiftId
      })
      .update({
        ...req.body
      }, ['*']);
      return res.send(newShift)
    } else {
      return res.sendStatus(404)
    }
  } catch (error) {
    return res.sendStatus(500)
  }
})



module.exports = router;