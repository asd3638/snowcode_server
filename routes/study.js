const express = require('express');
const { User, Study } = require('../models');

const router = express.Router();

router.post('/create', async (req, res, next) => {
  const { category, title, people, startLine, deadLine, content, wanted, writter } = req.body;
  try {
    await Study.create({
      category,
      title,
      startLine,
      deadLine,
      content,
      wanted,
      people,
      writter
    });
    return res.send("success");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const study = await Study.findAll();
    if (study) {
      res.status(200).send(study);
    } else {
      res.status(404).send('no any study');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const study = await Study.findOne({ where: { id: req.params.id } });
    if (study) {
      res.status(200).send(study);
    } else {
      res.status(404).send('no study');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});



router.route('/:id')
    .patch(async (req, res, next) => {
        try{
            const result = await Study.update({
                title: req.body.title,
                content: req.body.content,
                category: req.body.category,
                heart: req.body.heart,
                deadLine: req.body.deadLine,
                startLine: req.body.startLine,
                people: req.body.people,
                writter: req.body.writter
            }, {
                where: {id: req.params.id},
            });
            res.json(result);
        }catch (err) {
            console.error(err);
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const result = await Study.destroy({ where: {id: req.params.id}});
            res.json(result);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

//detail
router.get('/:id/studies/:id', async (req, res, next) => {
    try {
        const studies = await Study.findAll({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            startLine: req.body.startLine,
            deadLine: req.body.deadLine,
            people: req.body.people,
            wanted: req.body.wanted,   
            writter: req.body.writter,
        });

        /*
        const nick = await User.findAll({
            include: {
                model: User,
                where: {id: req.params.id}
            }
        });
        

        detail = [studies, nick];
        */
       
          console.log(studies);
          res.json(studies);
        }catch (err) {
          console.log(err);
          next(err);
        }
    })

module.exports = router;