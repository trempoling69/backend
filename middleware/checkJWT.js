const jwt = require("jsonwebtoken");
const db = require("../models/index");
const User = db.User;
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ where: { id : jwt_payload.id } })
    .then((user) => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err)=>{
      if (err) {
        return done(err, false);
      }
    })
  })
);

const verifyJWT = passport.authenticate("jwt", { session: false });

module.exports = { verifyJWT };
