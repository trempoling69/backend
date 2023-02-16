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
