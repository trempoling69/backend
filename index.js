const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const excel = require("exceljs");
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
const model = require("./db/model");
const User = model.User;
const Plante = model.Plante;
const Quiz = model.Quiz;

//? row dans la base de données pour check les values des utilisateurs
let configDonneeBdd = {
  nom: {
    type: "string",
    length: "200",
    notNull: true,
  },
  description: {
    type: "string",
    length: "5000",
    notNull: true,
  },
  couleur_dispo: {
    type: "string",
    length: "1000",
  },
  type: {
    type: "string",
    length: "50",
    valeurs: ["Vivaces", "annuelle", "Arbustes"],
    notNull: true,
  },
  feuillage: {
    type: "string",
    length: "40",
    valeurs: ["caduque", "persistant", "null"],
  },
  collection: {
    type: "string",
    length: "100",
  },
  exposition: {
    type: "string",
    length: "50",
    valeurs: ["Mi-Ombre", "Ombre", "Soleil", "Polyvalente", "null"],
  },
  hauteur: {
    type: "string",
    length: "20",
  },
  mois_floraison: {
    type: "string",
    length: "100",
  },
  periode_floraison: {
    type: "string",
    length: "20",
    valeurs: ["été", "printemps", "automne", "hiver"],
  },
  besoin_eau: {
    type: "string",
    length: "50",
    valeurs: ["un_peu", "beaucoup", "moyen"],
  },
  photo: {
    type: "string",
    length: "100",
  },
  dispo: {
    type: "string",
    length: "20",
    valeurs: ["InStock", "OutStock"],
  },
  prix: {
    type: "float",
    length: "20",
  },
  emplacement: {
    type: "string",
    length: "50",
  },
  quantiteProd: {
    type: "int",
    length: "11",
  },
  catchPhrase: {
    type: "string",
    length: "200",
  },
};
const checkuserInputAdd = require("./CheckInput/CheckUserInputAdd");
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

app.post("/login", (req, res) => {
  if (!req.body.username) {
    res.json({ success: false, message: "Username was not given" });
  } else if (!req.body.password) {
    res.json({ success: false, message: "Password was not given" });
  } else {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (!user) {
          res.json({
            success: false,
            message: "username or password incorrect",
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

//!register
app.post("/register", islogg, (req, res) => {
  User.count({ where: { username: req.body.username } }).then(async (count) => {
    if (count != 0) {
      res.send("useralready exist");
    } else {
      const hashedpassword = await bcrypt.hash(req.body.password, 10);
      User.create({
        username: req.body.username,
        password: hashedpassword,
      }).then(() => {
        res.send("user created !");
      });
    }
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

app.get("/user", islogg, (req, res) => {
  console.log(req.user);
  res.send(req.user.username);
  console.log("auth?" + req.isAuthenticated());
});

app.get("/allusers", islogg, (req, res) => {
  User.findAll({
    attributes: ["id_user", "username", "createdAt", "updatedAt", "lastConn"],
  }).then((users) => {
    res.json(users);
  });
});

app.get("/", (req, res) => {
  res.send("private API of Rougy Horticulture");
});

//*renvoie toutes les plantes
app.get("/api/products", (req, res) => {
  Plante.findAll().then((plantes) => {
    res.json(plantes);
  });
});

//*renvoie une plante en fonction de son ID
app.get("/api/products/:id", (req, res) => {
  var id = req.params.id;
  Plante.findOne({
    where: {
      id_plantes: id,
    },
  }).then((plantes) => {
    if (plantes === null) {
      res.send("rien a été trouvé");
    } else {
      res.json(plantes);
    }
  });
});

//*renvoie un export en excel
const exportxlsx = require("./excelRequest/exportxlsx");
app.get("/api/exportxlsx", (req, res) => {
  Plante.findAll().then((plantes) => {
    exportxlsx(res, plantes, UtilSheetName);
  });
});
//requete POST
//*permet d'envoyer un excel vers la bdd
const importcsv = require("./excelRequest/importxlsx");
const paths = require("path");
const filepath = paths.join(__dirname, "bddplantestest.xlsx");
const UtilSheetName = ["vivaces", "annuelles", "arbustes"];

app.get("/api/importxlsx", (req, res) => {
  importcsv(filepath, (object) => {
    for (let indexSheet = 0; indexSheet < UtilSheetName.length; indexSheet++) {
      var sheetname = UtilSheetName[indexSheet];
      for (let index = 0; index < object[sheetname].length; index++) {
        if (
          checkuserInputAdd(
            object[sheetname][index],
            configDonneeBdd,
            res,
            (data) => {
              Plante.findOrCreate({
                logging: false,
                where: {
                  nom: data.get("nom"),
                },
                defaults: {
                  nom: data.get("nom"),
                  description: data.get("description"),
                  couleur_dispo: data.get("couleur_dispo"),
                  type: data.get("type"),
                  feuillage: data.get("feuillage"),
                  collection: data.get("collection"),
                  exposition: data.get("exposition"),
                  hauteur: data.get("hauteur"),
                  mois_floraison: data.get("mois_floraison"),
                  periode_floraison: data.get("periode_floraison"),
                  besoin_eau: data.get("besoin_eau"),
                  photo: data.get("photo"),
                  dispo: data.get("dispo"),
                  prix: data.get("prix"),
                  emplacement: data.get("emplacement"),
                  quantiteProd: data.get("quantiteProd"),
                  catchPhrase: data.get("catchPhrase"),
                },
              });
            }
          )
        ) {
          res.end();
          return;
        }
      }
    }
    res.send(`Importation du fichier excel avec succès`);
  });
});

//*permet d'enregistrer une nouvelle plante
const upload = require("./middleware/multer");
const checkInput = require("./CheckInput/CheckUserInputAdd");
app.post("/api/insertplante", (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log(err);
      res.status(400).send(err.code);
    } else if (err) {
      console.log(err.message);
      res.status(400).send(err.message);
    } else {
      if (
        checkInput(req.body, configDonneeBdd, res, (data) => {
          Plante.create({
            nom: data.get("nom"),
            description: data.get("description"),
            couleur_dispo: data.get("couleur_dispo"),
            type: data.get("type"),
            feuillage: data.get("feuillage"),
            collection: data.get("collection"),
            exposition: data.get("exposition"),
            hauteur: data.get("hauteur"),
            mois_floraison: data.get("mois_floraison"),
            periode_floraison: data.get("periode_floraison"),
            besoin_eau: data.get("besoin_eau"),
            photo: req.file.filename,
            dispo: data.get("dispo"),
            prix: data.get("prix"),
            emplacement: data.get("emplacement"),
            quantiteProd: data.get("quantiteProd"),
            catchPhrase: data.get("catchPhrase"),
          })
            .then((result) => {
              res.status(200).send("plante ajouté");
            })
            .catch((err) => {
              res.status(400).send(err.message);
            });
        })
      ) {
        fs.unlink(`images/${req.file.filename}`, (err) => {
          if (err) {
            console.log(err);
            res.write("une erreur est survenu");
            res.end();
            return;
          }
          res.write(" . L'image n'a pas été enregistrée.");
          res.end();
        });
      }
    }
  });
});

//* permet de modifier une plante
app.post("/api/modifplante", islogg, (req, res) => {
  upload(req, res, (err) => {
    console.log(req.file);
    let photo = "";
    if (req.file === undefined) {
      photo = req.body.photo;
    } else {
      const path = `./images/${req.body.photo}`;
      fs.unlink(path, (err) => {
        if (err) throw err;
      });
      photo = req.file.filename;
    }
    Plante.update(
      {
        nom: req.body.nom,
        description: req.body.description,
        couleur_dispo: req.body.couleurdispo,
        type: req.body.type,
        feuillage: req.body.feuillage,
        collection: req.body.collection,
        exposition: req.body.exposition,
        hauteur: req.body.hauteur,
        mois_floraison: req.body.mois_floraison,
        periode_floraison: req.body.periode_floraison,
        besoin_eau: req.body.besoin_eau,
        photo: photo,
        dispo: req.body.dispo,
        prix: req.body.prix,
        emplacement: req.body.emplacement,
        quantiteProd: req.body.quantiteprod,
      },
      {
        where: { id_plantes: req.body.id },
      }
    );
  });
});

//requete DELETE
//*permet de supprimer une plante
app.delete("/api/supprimerplante/:id", islogg, (req, res) => {
  Plante.destroy({ where: { id_plantes: req.params.id } })
    .then((item) => {
      res.json({ status: item });
    })
    .catch((err) => res.json({ error: err }));
});

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
