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
const cart_routes = require('./routes/cart');
const order_routes = require('./routes/order');
const pot_routes = require('./routes/pot');
const categoryPrice_routes = require('./routes/categoryPrice');
const tag_routes = require('./routes/tag');

//*CONFIG SERVER
// const limiter = rateLimit({
//   windowMs: 60 * 60 * 1000, // 1 heure
//   max: 3000, // limite à ce nombre de requêtes par heure
//   message: 'Trop de requêtes, veuillez réessayer plus tard',
// });
app.use(helmet());
app.disable('x-powered-by');
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(helmet.frameguard({ action: 'deny' }));
// app.use(limiter);
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
const { sendErrorResponse } = require('./middleware/responseTemplate');
const basicCheckUserInput = require('./middleware/basicCheckUserInput');
const authSchema = require('./CheckInput/schema/auth');
const createCategory = require('./controllers/controllerCategoryPrice');
app.post('/login', basicCheckUserInput(authSchema.body.login, 'body'), controllerAuth.login);
app.post('/register', verifyJWT, basicCheckUserInput(authSchema.body.register, 'body'), controllerAuth.register);
app.get('/islogged', verifyJWT, controllerAuth.isLogged);

//*ROUTE GESTION API
app.use('/api', verifyJWT);
app.use('/api/user', user_routes);
app.use('/api/stats', info_routes);
app.use('/api/plante', plante_routes);
app.use('/api/excel', excel_routes);
app.use('/api/Gestionquiz', gestionquiz_routes);
app.use('/api/price', price_routes);
app.use('/api/order', order_routes);
app.use('/api/pot', pot_routes);
app.use('/api/categoryprice', categoryPrice_routes);
app.use('/api/tags', tag_routes);

//*ROUTE POUR LE QUIZ
app.use('/quiz', quiz_routes);

//*ROUTE POUR L'APP
app.use('/cart', cart_routes);
//*ROUTE BASIQUE
app.get('/', (req, res) => {
  res.send("Bienvenue sur l'api privé de RougyHorticulure");
});
app.use((req, res) => {
  sendErrorResponse('Ressource introuvable', res, 404);
});
app.use((err, req, res, next) => {
  console.error(err);
  sendErrorResponse(err.message, res, 500);
});
//----------------------------------------------------END API ROUTES--------------------------------------------------------

app.listen(process.env.DEV_PORT, () => {
  console.log(`running on port ${process.env.DEV_PORT}`);
});
