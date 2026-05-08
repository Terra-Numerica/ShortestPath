# L'Atelier des Graphes - Terra Numerica

Ce projet est un portail interactif regroupant plusieurs jeux éducatifs autour de la théorie des graphes et de l'informatique.  
Il a été conçu spécifiquement pour la médiation scientifique de Terra Numerica, afin de faire découvrir ces concepts mathématiques de manière ludique et visuelle.

---

## Les jeux disponibles

Ce portail centralise actuellement trois expériences interactives :

### 1. Coloration de Graphe

Un défi de logique visuelle.  
L'objectif est de colorier tous les sommets d'un graphe en utilisant le moins de couleurs possible, avec une règle stricte : deux sommets reliés par une arête ne peuvent jamais avoir la même couleur.

### 2. Le Défi d'Euler (Dessiner sans lever le crayon)

Basé sur le célèbre problème des ponts de Königsberg.  
Le joueur doit réussir à tracer l'intégralité d'une figure complexe d'un seul trait, sans jamais repasser deux fois sur la même arête.

### 3. Gendarme et Voleur

Un jeu de stratégie et de poursuite au tour par tour sur un graphe.  
Il illustre des concepts de topologie, de déplacement et de stratégie d'optimisation.

---

## Comment lancer le portail ?

L'ensemble des jeux est géré par un seul serveur de développement propulsé par Vite.  
Vous n'avez pas besoin de lancer les jeux individuellement.

### Prérequis

Vous devez avoir Node.js installé sur votre machine.  
Si ce n'est pas le cas, téléchargez-le depuis : https://nodejs.org/

### Installation

Ouvrez votre terminal, placez-vous dans le dossier principal du portail puis installez les dépendances :

```bash
npm install
```

Cette commande installera notamment `three.js` et `vite` pour l'ensemble des jeux.

### Lancement

Démarrez le serveur local avec la commande :

```bash
npm run dev
```

Le terminal vous donnera ensuite un lien (généralement `http://localhost:5173`).

Ouvrez ce lien dans votre navigateur pour accéder au menu principal du portail.  
Depuis ce menu, vous pourrez naviguer entre tous les jeux.

---

## Structure du projet

```text
index.html              -> Menu principal du portail
package.json            -> Gestion des dépendances du projet

graph-coloring-game/    -> Jeu de coloration de graphe
graph/                  -> Jeu du défi d'Euler
gendarmes-voleur/        -> Jeu du gendarme et du voleur
```
