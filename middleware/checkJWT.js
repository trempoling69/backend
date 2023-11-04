const jwt = require('jsonwebtoken');
const db = require('../models/index');
const User = db.User;
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ where: { id: jwt_payload.id } })
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((err) => {
        if (err) {
          return done(err, false);
        }
      });
  })
);

const verifyJWT = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      // Erreur lors de la vérification du token
      return res.status(500).json({ message: "Erreur lors de l'authentification." });
    }

    if (!user) {
      // Token non valide ou utilisateur non trouvé
      return res.status(401).json({ message: 'Token invalide ou utilisateur non autorisé.' });
    }

    // Authentification réussie, ajoutez l'utilisateur à l'objet de la requête
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = { verifyJWT };
