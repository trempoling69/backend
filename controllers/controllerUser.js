const { bddUser } = require("../utils/importbdd");
const { checkParamsId } = require("../CheckInput/checkParamsId");

const getUser = (req, res) => {
  console.log(req.user);
  console.log(req.user.role);
  res.send({ username: req.user.username, role: req.user.role });
  console.log("auth?" + req.isAuthenticated());
};

const getAllUser = (req, res) => {
  bddUser()
    .findAll({
      attributes: [
        "id_user",
        "username",
        "createdAt",
        "updatedAt",
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
    bddUser()
      .findOne({
        attributes: ["id_user", "role"],
        where: { id_user: data.get("id") },
      })
      .then((user) => {
        if (user.role == "chef") {
          res.status(400).send("Impossible de supprimer ce role");
        } else {
          bddUser()
            .destroy({
              where: { id_user: data.get("id") },
            })
            .then(() => {
              res.status(200).send("suppression réussi");
            });
        }
      });
  });
};

module.exports = { getUser, getAllUser, suppUser };
