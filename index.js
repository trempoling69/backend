//*SERVER IMPORT
const express = require('express');
const helmet = require('helmet');
const app = express();
const cors = require('cors');
const rateLimit = require('express-rate-limit');

//*ENV
require('dotenv').config();

//*VERIFICATION
const { verifyJWT } = require('./middleware/checkJWT');

//*ROUTES
const plante_routes = require('./routes/plante');
const excel_routes = require('./routes/excel');
const info_routes = require('./routes/stats');
const user_routes = require('./routes/user');
const quiz_routes = require('./routes/quiz');
const gestionquiz_routes = require('./routes/modifQuiz');
const price_routes = require('./routes/price');
const order_routes = require('./routes/order');
//-----------------------------------------------HEBERGEMENT-----------------------------------------------------------------------------
// if (typeof PhusionPassenger !== "undefined") {
//   PhusionPassenger.configure({ autoInstall: false });
// }
// app.use(function (request, response, next) {
//   if (!request.secure) {
//     return response.redirect("https://" + request.headers.host + request.url);
//   }

//   next();
// });
//------------------------------------------GESTION BASE DE DONNEE------------------------------------------------------
var models = require('./models/index');
models.Plante.sync();
models.User.sync();
models.Reponse.sync();
models.Question.sync();
models.Price.sync();
models.Order.sync();
// models.sequelize.sync().then(()=>{
//   console.log('bdd synchorinise');
// })
//------------------------------------------------------FIN GESTION BASE DE DONNEE-------------------------------------------------
//*CONFIG SERVER
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 3000, // limite à ce nombre de requêtes par heure
  message: 'Trop de requêtes de cette adresse IP, veuillez réessayer plus tard',
});
app.use(helmet());
app.disable('x-powered-by');
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(helmet.frameguard({ action: 'deny' }));
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static('images'));
const allowedOrigins = [process.env.CORS_ORIGINE_GBDD, process.env.CORS_ORIGINE_QUIZ];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200,
  })
);

//------------------------------------------------------API ROUTES----------------------------------------------------------------
//*ROUTE CONNEXION ET INSCRIPTION
const controllerAuth = require('./controllers/controllerAuth');
app.post('/login', controllerAuth.login);
app.post('/register', verifyJWT, controllerAuth.register);
app.get('/islogged', verifyJWT, controllerAuth.isLogged);

//*ROUTE GESTION API
app.use('/api', verifyJWT);
app.use('/api/user', user_routes);
app.use('/api/stats', info_routes);
app.use('/api/plante', plante_routes);
app.use('/api/excel', excel_routes);
app.use('/api/Gestionquiz', gestionquiz_routes);

//*ROUTE POUR LE QUIZ
app.use('/quiz', quiz_routes);

//*ROUTE POUR L'APP
app.use('/price', price_routes);
app.use('/order', order_routes);
//*ROUTE BASIQUE
app.get('/', (req, res) => {
  res.send("Bienvenue sur l'api privé de RougyHorticulure");
});

//----------------------------------------------------END API ROUTES--------------------------------------------------------

//demarrage server
// if (typeof PhusionPassenger !== "undefined") {
//   app.listen("passenger");
// } else {
//   app.listen(process.env.DEV_PORT, () => {
//     console.log(`running on port ${process.env.DEV_PORT}`);
//   });
// }

app.listen(process.env.DEV_PORT, () => {
  console.log(`running on port ${process.env.DEV_PORT}`);
});
