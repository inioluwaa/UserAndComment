const express = require('express');
const User = require('../models/User');
const db = require('../config/database')
const router = new express.Router();

router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {exclude: ['password']}
    });
    res.status(201).send(users)
  } catch (e) {
    res.status(500).send();
  }
})

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email, password: req.body.password },
      attributes: {exclude: ['password']}
    });
    if (!user) {
      res.status(400).send();
    }
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send();
  }
})

router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
})

module.exports = router;