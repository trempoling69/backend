const model = require("../db/model");
const User = model.User;
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;
const passport = require('passport');


passport.serializeUser((user, done) => {
  console.log("serialize");
  User.update({lastConn: Date.now()}, {where : {id_user : user.id_user}})
  done(null, user.id_user);
});

passport.deserializeUser((id, done) => {
  console.log("deser");
  User.findOne({ where: { id_user: id} }).then((user) => {
    done(null, user.dataValues);
  });
});
module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ where: { username: username } }).then((user) => {
        if (!user) return done(null, false, { message: 'Incorrect username or password.' });
        bcrypt.compare(password, user.dataValues.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user.dataValues);
          } else {
            return done(null, false, { message: 'Incorrect username or password.' });
          }
        });
      });
    })
  );
};
