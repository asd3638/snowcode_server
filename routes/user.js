const express = require('express');

const User = require('../models/user');
const Study = require('../models/study');

const router = express.Router();

router.post('/:id/follow', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send('success');
    } else {
      res.status(404).send('no user');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send('no user');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:id/studies', async (req, res, next) => {
  try {
    const studies = await Study.findAll({
      include: {
        model: User,
        where: { id: req.params.id },
      },
    });
    console.log(studies);
    res.json(studies);
  }catch (err) {
    console.log(err);
    next(err);
  }
})

module.exports = router;
