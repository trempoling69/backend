const { bddUser } = require("../utils/importbdd");
const checkLoginInput = require("../CheckInput/CheckUserInputAuth");
var bcrypt = require("bcryptjs");
var passport = require("passport");
require("../middleware/passportConfig")(passport);

exports.isLogged = (req, res) => {
  console.log(req.isAuthenticated());
  res.send(req.isAuthenticated());
};

exports.register = (req, res) => {
  checkLoginInput(req, res, (data) => {
    bddUser()
      .count({ where: { username: data.get("username") } })
      .then(async (count) => {
        if (count != 0) {
          res.send("useralready exist");
        } else {
          const hashedpassword = await bcrypt.hash(data.get("password"), 10);
          bddUser()
            .create({
              username: data.get("username"),
              password: hashedpassword,
            })
            .then(() => {
              res.send("user created !");
            });
        }
      });
  });
};

exports.login = (req, res) => {
  checkLoginInput(req, res, (data) => {
    req.body.username = data.get("username");
    req.body.password = data.get("password");
    if (!data.get("username")) {
      res.json({ success: false, message: "Username was not given" });
    } else if (!data.get("password")) {
      res.json({ success: false, message: "Password was not given" });
    } else {
      passport.authenticate("local", function (err, user, info) {
        if (err) {
          res.json({ success: false, message: err });
        } else {
          if (!user) {
            res.json({
              success: false,
              message: "Username ou password incorrect",
            });
          } else {
            req.login(user, (err) => {
              if (err) throw err;
              res.json({ success: true, message: "Authentication successful" });
            });
          }
        }
      })(req, res);
    }
  });
};
