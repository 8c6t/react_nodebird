const passport = require('passport');
const db = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser((id) => {
    try {
      const user = await db.User.fineOne({
        where: { id },
      });
      return done(null, user); // req.user
    } catch (error) {
      console.error(error);
      return done(error);
    }
  });
};
