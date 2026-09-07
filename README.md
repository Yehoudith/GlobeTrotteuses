# Les Globetrotteuses

Application web qui permet d’organiser plus facilement des voyages entre amies.

## Contexte et problème : 

Lors de l’organisation d’un voyage entre amies d’un même groupe, les informations importantes (réservations, activités, décisions et autres tâches) sont souvent dispersées. Cela peut entrainer des oublis, des difficultés de préparation, des tensions au sein du groupe et des opportunités manquées qui peuvent mettre en péril le voyage.

## Objectifs & critères de succès :

Objectif : permettre de répartir et de suivre les tâches pour l’organisation d’un voyage plus facilement entre les participants et à une voyageuse de partager avec le reste des voyageurs du groupe les réservations faites.

Le projet est réussi si, à la fin de la période :
- une voyageuse peut créer une tâche ;
- une voyageuse peut ajouter une réservation ;
- le planning du jour peut être visualiser ;
- au moins une démo de bout en bout fonctionne sans bug bloquant

## Périmètre V1
**Inclus (In)**
Gestion des tâches de préparation du voyage
Organisation des informations par catégories
Système de vote
Planning du voyage
Tableau de bord récapitulatif (bonus)

**Exclus (Out)**
Gestion du budget du voyage
Paiement en ligne entre voyageurs
Messagerie interne
Notifications automatiques
Gestion avancée des réservations
Checklist de valise
Gestion du matériel commun
Stockage de documents de voyage
Météo et informations locales
Partage de photos
Carte des voyages réalisés
Géolocalisation en temps réel
Application mobile native (iOS / Android)

## Rôles & responsabilités
| Rôle | Personne | Responsable de |
| Coordination projet | Morgane | Suivi de l’avancement global du projet
| Animation des dailys | A tour de rôle | Animation des points d'équipe |

## Conventions de travail
- **Dépôt :** GitHub — `https://github.com/Yehoudith/GlobeTrotteuses`
- **Branches :** main (stable) + une branche par fonctionnalité (`feat/nom-fonctionnalite`)
- **Commits :** un message clair au présent, de préférence en anglais (ex. `ajoute le formulaire de publication de trajet`)
- **Rituel d'équipe :** point de 15 min en début de chaque séance pour répartir le travail
- **Outils :** code sur VS Code, suivi des tâches sur un Kanban partagé


# Installation du projet GlobeTrotteuses

## Prérequis

Avant de commencer, vérifier que les outils suivants sont installés sur votre ordinateur :

* Git
* Docker Desktop
* Node.js
* pnpm

Vérifier les installations avec :

```bash
git --version
docker --version
node --version
pnpm --version
```

## 1. Cloner le projet

Dans un terminal, se placer dans le dossier dans lequel vous souhaitez installer le projet puis exécuter :

```bash
git clone [URL_DU_REPOSITORY]
```

Entrer ensuite dans le dossier du projet :

```bash
cd GlobeTrotteuses
```

## 2. Configurer les variables d'environnement

Le backend utilise des variables d'environnement pour se connecter à la base de données.

Créer le fichier :

```text
backend/.env
```

Si un fichier `.env.example` est présent dans le projet, le copier :

```bash
cp backend/.env.example backend/.env
```

Puis compléter les variables demandées.

⚠️ Le fichier `.env` contient des informations sensibles et ne doit pas être envoyé sur GitHub.

## 3. Installer les dépendances du front-end

Se placer dans le dossier du front-end :

```bash
cd frontend
```

Installer les dépendances :

```bash
pnpm install
```

Puis revenir à la racine du projet :

```bash
cd ..
```

## 4. Démarrer Docker

Vérifier que **Docker Desktop est lancé**.

Depuis la racine du projet, exécuter :

```bash
docker compose up --build
```

Cette commande permet de construire et démarrer les services nécessaires au projet, notamment :

* le backend Node.js / Express ;
* la base de données PostgreSQL.

Pour vérifier que les conteneurs fonctionnent :

```bash
docker compose ps
```

## 5. Démarrer le front-end

Ouvrir un deuxième terminal puis exécuter :

```bash
cd frontend
pnpm dev
```

Vite affiche alors l'adresse permettant d'accéder à l'application dans le terminal, généralement :

```text
http://localhost:5173
```

## 6. Vérifier le backend

Le serveur backend fonctionne sur le port :

```text
http://localhost:3000
```

Pour vérifier que le serveur fonctionne, ouvrir :

```text
http://localhost:3000
```

Une réponse du serveur doit apparaître.

## 7. Arrêter le projet

Arrêter le front-end avec :

```text
Ctrl + C
```

Puis arrêter les conteneurs Docker depuis la racine du projet :

```bash
docker compose down
```

## Relancer le projet

Pour relancer le projet après la première installation :

### Terminal 1

Depuis la racine :

```bash
docker compose up
```

### Terminal 2

```bash
cd frontend
pnpm dev
```

L'application est alors de nouveau accessible depuis le navigateur.
