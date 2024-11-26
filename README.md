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
2. Installer les dépendances
    ```bash
    npm install
    ```
3. Créer la base de données MySQL avec le nom `commandart`
4. Changer de répertoire pour le backend
    ```bash
    cd backend
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
9. Lancer le frontend
    ```bash
    npm run start
    ```
10. (Optionnel) Prier pour que rien ne plante
11. (Optionnel) Faire une offrande à la divinité de votre choix si tout fonctionne

## Commandes disponibles

- `npm run start` : Démarrer le serveur
- `npx sequelize-cli db:migrate` : Lancer les migrations de la base de données
- `npx sequelize-cli db:seed:all` : Lancer les seeds de la base de données