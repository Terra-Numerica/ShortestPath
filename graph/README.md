# Graphe 3D - Dessin sans lever le crayon

## Description du projet
Ce projet est une application web interactive en 3D visant a initier les enfants a la theorie des graphes, et plus specifiquement au probleme des chemins euleriens. L'objectif ludique est de tracer l'integralite d'une figure geometrique sans passer deux fois sur la meme arete et sans "lever le crayon".

## Technologies utilisees
* HTML5 / CSS3 : Structure et habillage de l'interface utilisateur.
* JavaScript (ES6+) : Logique applicative, gestion des etats et algorithme de resolution (Backtracking DFS).
* Three.js : Moteur de rendu 3D WebGL pour l'affichage interactif des graphes.
* Vite.js : Outil de build et serveur de developpement ultra-rapide.

## Arborescence du projet
```
mon-graphe-3d/
|-- package.json
|-- index.html
|-- style.css
|-- README.md
|-- src/
    |-- main.js
    |-- levels.js
```
## Role des fichiers
* package.json : Fichier de configuration de Node.js listant les dependances du projet (Three.js, Vite) et les scripts de lancement.
* index.html : Point d'entree de l'application. Contient la structure de l'interface superposee a la zone de rendu 3D (menus, boutons, fenetres modales).
* style.css : Feuille de style assurant la mise en page et l'esthetique de l'interface utilisateur.
* src/main.js : Fichier principal contenant la configuration de la scene Three.js, la logique du jeu, la gestion des evenements utilisateurs, l'historique d'actions (Undo) et l'algorithme de resolution automatique.
* src/levels.js : Base de donnees des niveaux. Contient les coordonnees spatiales (x, y, z) des sommets (noeuds) et les connexions (aretes) pour chaque figure.

## Pre-requis
Pour lancer ce projet en local, les outils suivants doivent etre installes sur votre machine :
* Node.js (version 14 ou superieure recommandee)
* npm (generalement installe avec Node.js)

## Installation et lancement
1. Ouvrez un terminal.
2. Naviguez jusqu'au dossier racine du projet (la ou se trouve le fichier package.json).
3. Installez les dependances requises en executant la commande :
```
   npm install
```
1. Lancez le serveur de developpement local avec la commande :
```
   npm run dev
```
1. Ouvrez votre navigateur web et accedez a l'adresse locale fournie par le terminal (generalement http://localhost:5173).

## Fonctionnalites principales
* Affichage de graphes en 3D avec manipulation de la camera (rotation, zoom).
* Systeme de jeu interactif avec validation en temps reel des mouvements autorises.
* Comptabilisation des erreurs (leves de crayon).
* Systeme d'annulation des actions (Undo).
* Algorithme de resolution visuelle pas-a-pas pour aider l'utilisateur.
* Mode editeur permettant a l'utilisateur de creer, de jouer et de resoudre ses propres graphes en 3D.