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

- Lors de la première installation sur un nouveau serveur, pour créer le premier user :
  > Mettre ceci dans le index.js et lancer le serveur, il va crash mais
  > le user sera correctement créé, il faut ensuite le supprimer et on
  > peut se connecter normalement sur le front

```javascript
const fakereq = {
  body: {
    username: '#VOTREUSERNAME',
    password: '#VOTREMDP',
  },
};
const fakeres = {};
controllerAuth.register(fakereq, fakeres);
```

- Config serveur lors de la première initialisation

```
Créer un dossier logs à la racine pour générer les logs d'importation excel
Créer un dossier images pour les photos des produits
Mettre une image null.png dedans (photo de base pour les produits qui n'en n'ont pas)
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
