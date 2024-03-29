# Application backend du projet

dev en Node.js avec une bdd en MySQL

### utilisation

- login
- inserer 
- modifier
- supprimer
- import excel
- export excel
- gestion de photo

### update 21/01 

- Suppression du fichier checkJsonValue 
- CheckuserInput amélioré pour qu'il soit utilisable pour aussi vérifier les données dans le xlsx
- Insertion d'une plante : gestion de la suppression de la photo du serveur si les données ne sont pas validées 

### update 16/02 

- Implémentation côté frontend de l'importation de XLSX, paramétrage avec multer du traitement 
- Création de controllers pour rendre le code plus clair 
- Vérification des inputs utilisateurs avant leur traitement
- Correction de nombreux bugs
- Gestion d'une partie des erreur faisant crash le serveur 

### update 27/02

- Mise en place d'un système d'authentification par JWT
- Mise en place de différent middleware de sécurité
- fichier log pour les importation excel qui regroupe les erreurs et réussite
- Réorganisation total du server
- gros nettoyage
- Ajout du hash de chaque plante dans la bdd pour savoir si elle a été modifier sur excel
- Gestion des erreurs de saisie sur le excel non bloquante, le reste s'importe

### update 01/03

- Mise en place des principales route pour la gestion du quiz 
- Model de bdd pour les tables Question et Reponse + gestion clés étrangères

### update 11/03

- Les erreurs excel ne sont plus bloquante, s'il y a une erreur sur le premier champ il continue 
à check les autres champs pour indiquer toutes les erreurs mais n'importe pas la ligne dans la bdd
- Refonte total de l'utilisation de sequelize 
- Les tables sont maintenant créées automatiquement si elle n'existe pas 
- Définition de nouveaux models
- Mise en place des clés étrangères 
- Définition des bases de données pour les différent environnement DEV / TEST / PROD

### update 06/05

- Routes CRUD pour la gestion des prix basiques
- Première routes pour les prix spécifique
- Model pour la table price
- Définition de la clé étrangère prix pour chaque plante

### update 11/05

- gestion des prix spécifique
- création des prix spécifique à la création d'une plante
- filtre sur les input des utilisateurs dans la gestion des prix (type et caractère HTML)

### update 18/05

- import export des prix 
- check des valeurs entrée dans le excel
- gestion de l'erreur de clé étrangère du prix qui n'existe pas dans plante lors de l'importation excel
- Ajout d'un hash au prix pour gérer les ajouts / doublons / modification via excel
- Modification d'une plante mis a jour pour les clé étrangère de prix
- Export excel, sheet prix ajouté

### update 29/05 

- préparation pour l'implémentation des commandes

### update 29/07

- changement dans l'import pour que les champs vide soit null et non plus le string 'null'

### update 01/11

- reprise au propre des models de la bdd
- optimisation de la création des tables
- création de seeders pour la première utilisation
- changement dans la gestion des clés étrtangères
- créations du dossiers service qui regroupe les actions de base (create, get, update delete) sur la bdd
- mise en place d'un template de réponse pour unifier les réponses
- passage des fonctions en async await pour mieux gérer les requêtes
- menages au maximum sur les fonctions
- suppression de code legacy sur la db
- ajout de JOI pour traiter les data entrante 
- meilleur gestion des prix lors de création et modification de la plante
