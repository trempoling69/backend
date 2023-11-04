const db = require('../models/index');
const User = db.User;
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;
const passport = require('passport');

passport.serializeUser((user, done) => {
  console.log('serialize');
  User.update({ lastConn: Date.now() }, { where: { id_user: user.id_user } });
  done(null, user.id_user);
});

passport.deserializeUser((id, done) => {
  console.log('deser');
  User.findOne({ where: { id_user: id } }).then((user) => {
    done(null, user.dataValues);
  });
});
module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ where: { username: username } })
        .then((user) => {
          if (!user) {
            return done(null, false);
          }

          bcrypt.compare(password, user.dataValues.password, (err, result) => {
            if (err) {
              return done(err);
            }

            if (result === true) {
              return done(null, user.dataValues);
            } else {
              return done(null, false);
            }
          });
        })
        .catch((err) => {
          return done(err);
        });
    })
  );
};
