const passport = require('passport');
const googleStrategy = require('passport-google-oauth2').Strategy;

const User = require('../models/user');

module.exports = () => {
  passport.use(new googleStrategy({
    clientID      : process.env.GOOGLE_CLIENT_ID,
    clientSecret  : process.env.GOOGLE_SECRET,
    callbackURL   : '/auth/google/callback',
    passReqToCallback   : true
  }, async (request, accessToken, refreshToken, profile, done) => {
    console.log('google profile', profile);
    try {
      const exUser = await User.findOne({
        where: { snsId: profile.id, provider: 'kakao' },
      });
      if (exUser) {
        done(null, exUser);
      } else {
        const newUser = await User.create({
          nick: profile.displayName,
          snsId: profile.id,
          provider: 'google',
        });
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
