const express = require('express');
const Reply = require('../models/Reply');
const db = require('../config/database')
const router = new express.Router();

router.post('comments/:commentId/replies', async (req, res) => {
  const commentId = req.param
  const reply = Reply.create({
    reply: req.body.reply,
    commentId: commentId
  });

  try {
    await reply.save();
    res.status(201).send(reply);
  } catch (e) {
    res.status(400).send(e);
  }
})

router.get('/comments/:commentId/replies:', async (req, res) => {
  try {
    const replies = await Reply.findAll({ where: { commendId: req.params.commentId } });
    res.send(replies)
  } catch (e) {
    res.status(500).send();
  }
})