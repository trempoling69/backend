const { bddUser } = require('../../utils/importbdd')

exports.getUser = (req, res) => {
    console.log(req.user);
    res.send(req.user.username);
    console.log("auth?" + req.isAuthenticated());
  }

exports.getAllUser = (req, res) => {
    bddUser().findAll({
      attributes: ["id_user", "username", "createdAt", "updatedAt", "lastConn"],
    }).then((users) => {
      res.json(users);
    });
}