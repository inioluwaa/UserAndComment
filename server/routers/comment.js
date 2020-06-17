const express = require('express');
const Comment = require('../models/Comment');
const db = require('../config/database')
const router = new express.Router();

router.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.send(comments)
  } catch (e) {
    res.status(500).send();
  }
})

router.post('/users/:userId/comments', async (req, res) => {
  const userId = req.param
  const comment = Comment.create({
    comment: req.body.comment,
    userId: userId
  });

  try {
    await comment.save();
    res.status(201).send(comment);
  } catch (e) {
    res.status(400).send(e);
  }
})

router.patch('/users/:userId/comments/:id', async (req, res) => {
  try {
    const comment = await Comment.update(
        { comment: req.body.comment },
        { where: { id: req.params.id, userId: req.params.userId } } );

    if (!comment) {
      return res.status(404).send();
    }
    await comment.save();
    res.send(comment);
  } catch (e) {
    res.status(400).send(e);
  }
})

router.delete('/users/:userId/comments/:id', async (req, res) => {
  try {
    const comment = await Comment.destroy({ where: {id: req.body.id, userId: req.params.userId } });
    if (!comment) {
      return res.status(404).send();
    }
    res.send(comment);
  } catch (e) {
    res.status(500).send();
  }
})

module.exports = router;