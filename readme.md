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