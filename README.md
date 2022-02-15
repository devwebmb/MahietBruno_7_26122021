MahietBruno_7_26122021

Bonjour et bienvenue dans mon projet 7 de la formation de développeur web d'Openclassrooms.

Nodejs doit être installé sur votre ordinateur.

// LANCER LE PROJET

// LA BASE DE DONNEES

Créer une base de données nommée groupomania avec mySQL ou MariaDB .
Ouvrez un terminal.
Connectez vous à mysql ( mysql -h localhost -u root).
Créer une base de données nommée groupomania ( CREATE DATABASE groupomania ).

// API ou BACKEND

Ouvrez le dossier backend dans un éditeur de code
Ouvrez le fichier .env à la racine du dossier backend

Renseignez :

- Votre nom d'utilisateur mySQL (DB_USER),
- Votre mot de passe mySQL (DB_PASSWORD),
- Votre hote (DB_HOST),

Au lancement du serveur de l'api un administrateur sera automatiquement enregistré dans la base de données groupomania. Vous pouvez changer ses caractéristiques dans la partie administateur du fichier .env

Vous pouvez aussi changer la valeur du port où sera écouter l'api (PORT).
Vous pouvez aussi définir une clé d'encodage(PRIVATE_KEY)

Ouvrez un terminal en ligne de commandes sur le dossier backend

Exécutez la commande npm install.

Ensuite exécutez la commande node server ou nodemon server si vous l'utilisez.

L'api est prête à être requétée.

// FRONTEND

Ouvrez le terminal en ligne de commandes sur le dossier frontend

Exécutez npm install

Ensuite exécutez npm run serve

Si le site ne se lance pas automatiquement entrez l'adreese du localhost directement dans votre navigateur ( http://localhost:8080/)
