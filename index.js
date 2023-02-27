const express = require("express");
const app = express();
const cors = require("cors");
const rateLimit = require("express-rate-limit");

//*ROUTES

const plante_routes = require("./routes/plante");
const excel_routes = require("./routes/excel");
const info_routes = require("./routes/stats");
const user_routes = require("./routes/user")

//!login
var passport = require("passport");
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
const Quiz = model.Quiz;

//------------------------------------------------------FIN GESTION BASE DE DONNEE-------------------------------------------------
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 3000, // limite à 30 requêtes par heure
  message: "Trop de requêtes de cette adresse IP, veuillez réessayer plus tard",
});
app.use(limiter);
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
    return res.status(401).send("connexion nécessaire");
  }
};

const isChef = (req, res, next) => {
  if (req.user.role == "chef") {
    next();
  } else {
    return res.status(401).send("Pas autorisé");
  }
};
//!---------------------------------------------------END LOGIN HANDLER------------------------------------------------------------

//------------------------------------------------------API ROUTES----------------------------------------------------------------

const controllerAuth = require("./controllers/controllerAuth");
app.post("/login", controllerAuth.login);
app.post("/register", islogg, controllerAuth.register);
app.get("/islogged", controllerAuth.isLogged);

app.use('/api', islogg)
app.use('/api/user', user_routes)
app.use("/api/stats", info_routes);
app.use("/api/plante", plante_routes);
app.use("/api/excel", excel_routes);


//ROUTE TEST POUR UNE AUTRE APPLICATION
app.get("/api/quiz/getall", (req, res) => {
  console.log(req.user);
  Quiz.findAll().then((quiz) => {
    res.json(quiz);
  });
});
app.get("/", (req, res) => {
  res.send([
    {
      title: "API ROUGY",
      message: "Bienvenue sur l'api privé de RougyHorticulure",
    },
  ]);
});
//----------------------------------------------------END API ROUTES--------------------------------------------------------

//demarrage server
app.listen(process.env.DEV_PORT, () => {
  console.log(`running on port ${process.env.DEV_PORT}`);
});
