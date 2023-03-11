const { User } = require("../utils/importbdd");
const { checkParamsId } = require("../CheckInput/checkParamsId");

const getUser = (req, res) => {
  console.log(req.user.role);
  res.send({ username: req.user.username, role: req.user.role });
  console.log("auth?" + req.isAuthenticated());
};

const getAllUser = (req, res) => {
  User()
    .findAll({
      attributes: [
        "id",
        "username",
        "lastConn",
        "role",
      ],
    })
    .then((users) => {
      res.json(users);
    });
};

const suppUser = (req, res) => {
  checkParamsId(req, res, (data) => {
    User()
      .findOne({
        attributes: ["id", "role"],
        where: { id: data.get("id") },
      })
      .then((user) => {
        if (user.role == "chef") {
          res.status(400).send("Impossible de supprimer ce role");
        } else {
          User()
            .destroy({
              where: { id: data.get("id") },
            })
            .then(() => {
              res.status(200).send("suppression réussi");
            });
        }
      });
  });
};

module.exports = { getUser, getAllUser, suppUser };
