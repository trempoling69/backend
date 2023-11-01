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

- Lors de la première installation pour seeder la db :

```
  npx sequelize-cli db:seed:all
```

- Config serveur lors de la première initialisation

```
Créer un dossier logs à la racine pour générer les logs d'importation excel
Créer un dossier images pour les photos des produits
Mettre une image null.png dedans (photo de base pour les produits qui n'en n'ont pas)
```

