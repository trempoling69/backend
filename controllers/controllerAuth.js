const { User } = require('../utils/importbdd');
const checkLoginInput = require('../CheckInput/CheckUserInputAuth');
var bcrypt = require('bcryptjs');
var passport = require('passport');
require('../middleware/passportConfig')(passport);
const jwt = require('jsonwebtoken');
const { sendSuccessResponse } = require('../middleware/responseTemplate');
require('dotenv').config();

exports.isLogged = (req, res) => {
  console.log(req.isAuthenticated());
  res.send(true);
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

exports.login = (req, res) => {
  checkLoginInput(req, res, (data) => {
    req.body.username = data.get('username');
    req.body.password = data.get('password');
    if (!data.get('username')) {
      res.json({ success: false, message: 'Username was not given' });
    } else if (!data.get('password')) {
      res.json({ success: false, message: 'Password was not given' });
    } else {
      passport.authenticate('local', { session: false }, function (err, user, info) {
        if (err) {
          res.json({ success: false, message: err });
        } else {
          if (!user) {
            res.json({
              success: false,
              message: 'Username ou password incorrect',
            });
          } else {
            req.login(user, { session: false }, (err) => {
              if (err) {
                res.send(err);
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
                  res.json({
                    success: true,
                    message: 'Authentication successful',
                    token,
                  });
                });
            });
          }
        }
      })(req, res);
    }
  });
};
