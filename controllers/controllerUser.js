const { User } = require('../utils/importbdd');
const { checkParamsId } = require('../CheckInput/checkParamsId');
const { sendSuccessResponse } = require('../middleware/responseTemplate');
const { Op } = require('sequelize');

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
        sendSuccessResponse(users, res, 200);
      });
  } catch (err) {
    next(err);
  }
};

const suppUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userToDelete = await User().findOne({
      attributes: ['id', 'role'],
      where: { id: { [Op.eq]: id } },
    });

    if (userToDelete.role == 'chef') {
      throw new Error('Impossible de supprimer cet utilisateur');
    }
    await User().destroy({
      where: { id: { [Op.eq]: id } },
    });

    sendSuccessResponse('Utilisateur supprimé avec succès', res, 200);
  } catch (err) {
    next(err);
  }
};

module.exports = { getUser, getAllUser, suppUser };
