const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const sequelize = require("sequelize");

//!login
var passport = require("passport");
var passportLocal = require("passport-local").Strategy;
var bcrypt = require("bcryptjs");
var cookieParser = require("cookie-parser");
var session = require("express-session");
require("dotenv").config();
//------------------------------------------GESTION BASE DE DONNEE------------------------------------------------------

var con = require("./db/conn");
var sequelizeconn = con.sequelizeconn;

sequelizeconn
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

//? Gestion model bdd
const { Op } = require("sequelize");
const model = require("./db/model");
const User = model.User;
const Quiz = model.Quiz;

//------------------------------------------------------FIN GESTION BASE DE DONNEE-------------------------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/images", express.static("images"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//!-------------------------------------------------------LOGIN TEST-------------------------------------------------------------
//!login use*
require("./middleware/passportConfig")(passport);
//app.set("trust proxy", 1);
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

//!end login use
const islogg = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "la fonction t'as queblo relou" });
  }
};
//!login

const checkLoginInput = require("./CheckInput/CheckUserInputAuth");
app.post("/login", (req, res) => {
  checkLoginInput(req, res, (data) => {
    req.body.username = data.get("username");
    req.body.password = data.get("password");
    console.log(req.body.username);
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
});

//!register
app.post("/register", islogg, (req, res) => {
  checkLoginInput(req, res, (data) => {
    User.count({ where: { username: data.get("username") } }).then(
      async (count) => {
        if (count != 0) {
          res.send("useralready exist");
        } else {
          const hashedpassword = await bcrypt.hash(data.get("password"), 10);
          User.create({
            username: data.get("username"),
            password: hashedpassword,
          }).then(() => {
            res.send("user created !");
          });
        }
      }
    );
  });
});

//!---------------------------------------------------END LOGIN HANDLER------------------------------------------------------------

//------------------------------------------------------API ROUTES----------------------------------------------------------------
//*lien basique api
//requete GET

app.get("/islogged", (req, res) => {
  console.log(req.isAuthenticated());
  res.send(req.isAuthenticated());
});

const controllerUser = require("./controllers/user/controllerUser")
app.get("/user", islogg, controllerUser.getUser);

app.get("/allusers", islogg, controllerUser.getAllUser);

const controllerInfo = require('./controllers/info/controllerInfo')
app.get("/", controllerInfo.defaultLink);

app.get("/api/stats", islogg, controllerInfo.stats);

//*renvoie toutes les plantes
const controllerPlante = require('./controllers/plante/controllerPlante')
app.get("/api/products", islogg, controllerPlante.allPlantes);

//*renvoie une plante en fonction de son ID
app.get("/api/products/:id", islogg, controllerPlante.planteById);

//*renvoie un export en excel
const controllerExcel = require('./controllers/excel/controllerExcel')
app.get("/api/exportxlsx", islogg, controllerExcel.exportationxlsx);

//requete POST
//*permet d'envoyer un excel vers la bdd
app.post("/api/importxlsx", islogg, controllerExcel.importationxlsx)

//*permet d'enregistrer une nouvelle plante
app.post("/api/insertplante", islogg, controllerPlante.insertPlante);

//* permet de modifier une plante
app.post("/api/modifplante", islogg, controllerPlante.modifPlante);

app.post("/api/toggledispo", islogg, controllerPlante.toggleDispo);
//requete DELETE
//*permet de supprimer une plante
app.delete("/api/supprimerplante/:id", islogg, controllerPlante.suppPlante);

//ROUTE TEST POUR UNE AUTRE APPLICATION
app.get("/api/quiz/getall", (req, res) => {
  console.log(req.user);
  Quiz.findAll().then((quiz) => {
    res.json(quiz);
  });
});
//----------------------------------------------------END API ROUTES--------------------------------------------------------

//demarrage server
app.listen(process.env.DEV_PORT, () => {
  console.log(`running on port ${process.env.DEV_PORT}`);
});
