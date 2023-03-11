//*SERVER IMPORT
const express = require("express");
const helmet = require("helmet");
const app = express();
const cors = require("cors");
const rateLimit = require("express-rate-limit");

//*ENV
require("dotenv").config();

//*VERIFICATION
const { verifyJWT } = require("./middleware/checkJWT");

//*ROUTES
const plante_routes = require("./routes/plante");
const excel_routes = require("./routes/excel");
const info_routes = require("./routes/stats");
const user_routes = require("./routes/user");
const quiz_routes = require("./routes/quiz");
const gestionquiz_routes = require("./routes/modifQuiz");

//------------------------------------------GESTION BASE DE DONNEE------------------------------------------------------
var models = require("./models/index");
models.Plante.sync();
models.User.sync();
models.Reponse.sync();
models.Question.sync();
// models.sequelize.sync().then(()=>{
//   console.log('bdd synchorinise');
// })
//------------------------------------------------------FIN GESTION BASE DE DONNEE-------------------------------------------------
//*CONFIG SERVER
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 3000, // limite à ce nombre de requêtes par heure
  message: "Trop de requêtes de cette adresse IP, veuillez réessayer plus tard",
});
app.use(helmet());
app.disable("x-powered-by");
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(helmet.frameguard({ action: "deny" }));
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("images"));
app.use(
  cors({
    origin: "*",
  })
);
//------------------------------------------------------API ROUTES----------------------------------------------------------------
//*ROUTE CONNEXION ET INSCRIPTION
const controllerAuth = require("./controllers/controllerAuth");
app.post("/login", controllerAuth.login);
app.post("/register", verifyJWT, controllerAuth.register);
app.get("/islogged", verifyJWT, controllerAuth.isLogged);

//*ROUTE GESTION API
app.use("/api", verifyJWT);
app.use("/api/user", user_routes);
app.use("/api/stats", info_routes);
app.use("/api/plante", plante_routes);
app.use("/api/excel", excel_routes);
app.use("/api/Gestionquiz", gestionquiz_routes);

//*ROUTE POUR LE QUIZ
app.use("/quiz", quiz_routes);

//*ROUTE BASIQUE
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'api privé de RougyHorticulure");
});

//----------------------------------------------------END API ROUTES--------------------------------------------------------

//demarrage server

app.listen(process.env.DEV_PORT, () => {
  console.log(`running on port ${process.env.DEV_PORT}`);
});
