const express = require('express');
const { User, Study } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const study = await Study.create({
            writter: req.body.id,
            title: req.body.title,
            content: req.body.content,
        });
        console.log(title);
        res.status(201).json(title);
        console.log(content);
        res.status(201).json(content);
    } catch (err) {
        console.error(err);
        next(err);
    }
});


router.route('/:id')
    .patch(async (req, res, next) => {
        try{
            const result = await Study.updeate({
                title: req.body.title,
                content: req.body.content,
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