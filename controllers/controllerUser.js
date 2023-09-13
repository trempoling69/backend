const { User } = require('../utils/importbdd');
const { checkParamsId } = require('../CheckInput/checkParamsId');
const { sendSuccessResponse } = require('../middleware/responseTemplate');

const getUser = (req, res, next) => {
  try {
    console.log(req.user.role);
    sendSuccessResponse({ username: req.user.username, role: req.user.role }, res, 200);
    console.log('auth?', req.isAuthenticated());
  } catch (err) {
    next(err);
  }
};

const getAllUser = (_req, res, next) => {
  try {
    User()
      .findAll({
        attributes: ['id', 'username', 'lastConn', 'role'],
      })
      .then((users) => {
        res.json(users);
      });
  } catch (err) {
    next(err);
  }
};

const suppUser = (req, res) => {
  checkParamsId(req, res, (data) => {
    User()
      .findOne({
        attributes: ['id', 'role'],
        where: { id: data.get('id') },
      })
      .then((user) => {
        if (user.role == 'chef') {
          res.status(400).send('Impossible de supprimer ce role');
        } else {
          User()
            .destroy({
              where: { id: data.get('id') },
            })
            .then(() => {
              res.status(200).send('suppression réussi');
            });
        }
      });
  });
};

module.exports = { getUser, getAllUser, suppUser };
