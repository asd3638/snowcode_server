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

module.exports = router;