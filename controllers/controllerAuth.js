const { User } = require('../utils/importbdd');
var bcrypt = require('bcryptjs');
var passport = require('passport');
require('../middleware/passportConfig')(passport);
const jwt = require('jsonwebtoken');
const { sendSuccessResponse } = require('../middleware/responseTemplate');
require('dotenv').config();

exports.isLogged = (req, res) => {
  console.log(req.isAuthenticated());
  sendSuccessResponse(req.isAuthenticated(), res, 200);
};

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const countUser = await User().count({ where: { username: username } });
    if (countUser !== 0) {
      throw new Error('Utilisateur déjà existant');
    } else {
      const hashedpassword = await bcrypt.hash(password, 10);
      await User().create({
        username,
        password: hashedpassword,
      });
      sendSuccessResponse('utilisateur créé avec succès', res, 200);
    }
  } catch (err) {
    next(err);
  }
};

exports.login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err) {
      const error = new Error('OUPS ! Une erreur est survenue');
      return next(error);
    }

    if (!user) {
      const error = new Error('Identifiant ou mot de passe incorrect');
      return next(error);
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        console.log(err);
        const error = new Error('OUPS ! Une erreur est survenue');
        return next(error);
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      User()
        .update(
          {
            lastConn: Date.now(),
          },
          {
            where: {
              id: user.id,
            },
          }
        )
        .then(() => {
          sendSuccessResponse({ token }, res, 200);
        })
        .catch((err) => {
          console.log(err);
          const error = new Error('Erreur lors de la mise à jour des informations utilisateur');
          return next(error);
        });
    });
  })(req, res);
};
