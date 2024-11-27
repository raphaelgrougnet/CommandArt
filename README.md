# CommandArt

## Description
CommandArt est une application qui permet de créer des commandes d'oeuvres d'art.

## Prérequis
- Node.js
- npm
- MySQL

## Installation

1. Cloner le projet
    ```bash
    git clone https://github.com/raphaelgrougnet/CommandArt.git
    ```
2. Changer de répertoire pour le backend
    ```bash
    cd backend
    ```
3. Installer les dépendances
    ```bash
    npm install
    ```
4. Créer la base de données MySQL
   ```bash
   npx sequelize-cli db:create
   ```

5. Lancer la migration
    ```bash
    npx sequelize-cli db:migrate
    ```
6. Lancer le seed
    ```bash
    npx sequelize-cli db:seed:all
    ```
7. Lancer le serveur backend
    ```bash
    npm run start
    ```
8. Changer de répertoire pour le frontend
    ```bash
    cd ../frontend
    ```
9. Installer les dépendances
    ```bash
    npm install
    ```
10. Lancer le frontend
    ```bash
    npm run start
    ```
11. (Optionnel) Prier pour que rien ne plante
12. (Optionnel) Faire une offrande à la divinité de votre choix si tout fonctionne

## Commandes disponibles

- `npm run start` : Démarrer le serveur
- `npx sequelize-cli db:migrate` : Lancer les migrations de la base de données
- `npx sequelize-cli db:seed:all` : Lancer les seeds de la base de données