# DOCUMENTATION

## Configuration

- remplir le point .env en suivant le template du .env.exemple
- installer les packages 
```
npm install
```
- commande pour démarrer en dev avec nodemon : 
```
npm run devStart
```

## Info

- L'ordre de synchronisation des models sequelize est important : 
```javascript
models.Plante.sync();
models.User.sync();
models.Reponse.sync();
models.Question.sync();
models.Price.sync();
models.Order.sync();
```

Il permet de gérer correctement les clées étrangères 
