const express = require('express');
const { User, Study, Comment } = require('../models');

const router = express.Router();

router.post('/create', async (req, res, next) => {
  const { comment, commenter, board } = req.body;
  try {
    await Comment.create({
      comment,
      commenter,
      board
    });
    return res.send("success");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const comment = await Comment.findAll();
    if (comment) {
      res.status(200).send(comment);
    } else {
      res.status(404).send('no any comment');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:id/studies/:id/comment/:id', async (req, res, next) => {
  try {
    const comment = await Comment.findOne({ where: { id: req.params.id } });
    if (comment) {
      res.status(200).send(comment);
    } else {
      res.status(404).send('no comment');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//detail
router.get('/:id/studies/:id/comments', async (req, res, next) => {
    try {
        const comments = await Comment.findAll({
            comment: req.body.comment,
            commenter: req.body.commenter,
            board: req.body.board,
        });
          console.log(comments);
          res.json(comments);
        }catch (err) {
          console.log(err);
          next(err);
        }
    })

module.exports = router;