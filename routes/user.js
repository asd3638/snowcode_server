const express = require('express');
//const User = require('../models/user');
const router = express.Router();
const models = require("../models");
const crypto = require('crypto');

router.get('/sign_up', function(req, res, next) {
  res.render("user/signup");
});


router.post("/sign_up", function(req,res,next){
  let body = req.body;

  models.user.create({
    name: body.userName,
    email: body.userEmail,
    password: body.password
  })
  .then( result => {
    res.redirect("/users/sign_up");
  })
  .catch( err => {
    console.log(err)
  })
})

router.post("/sign_up", async function(req,res,next){
  let body = req.body;

  let inputPassword = body.password;
  let salt = Math.round((new Date().valueOf() * Math.random())) + "";
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  let result = models.user.create({
      name: body.userName,
      email: body.userEmail,
      password: hashPassword,
      salt: salt
  })

  res.redirect("/user/sign_up");
})

/*
router.route('/')
  .get(async (req, res, next) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const user = await User.create({
        // html의 id 넣어준다
        mail: req.body.mail,
        password: req.body.password,
        nickName: req.body.nickName,
        studentId: req.body.studentId,
      });
      console.log(user);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });
  */
  

module.exports = router;