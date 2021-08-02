const express = require('express');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/');
});

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/');
});

module.exports = router;
