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
|---|---|---|
| Coordination projet | Morgane | Suivi de l'avancement global du projet |
| Animation des dailys | A tour de rôle | Animation des points d'équipe |

## Conventions de travail

- **Dépôt :** GitHub — `https://github.com/Yehoudith/GlobeTrotteuses`
- **Branches :** main (stable) + une branche par fonctionnalité (`feat/nom-fonctionnalite`)
- **Commits :** un message clair au présent, de préférence en anglais (ex. `ajoute le formulaire de publication de trajet`)
- **Rituel d'équipe :** point de 15 min en début de chaque séance pour répartir le travail
- **Outils :** code sur VS Code, suivi des tâches sur un Kanban partagé

## Installation

### Prérequis
- Node.js (v18+)
- pnpm
- Docker & Docker Compose

### Backend
```
cd backend
pnpm install
```
Créer un fichier `.env` à la racine de `backend/` (à partir de .env.example)
Le backend démarre ensuite avec :
```
pnpm run dev
```
### Database
```
docker compose up
```
### Frontend
```
cd frontend
pnpm install
pnpm run dev
```

## Structure du projet

```
GlobeTrotteuses/
├── backend/
│   ├── src/
│   │   ├── routes/          -- définition des endpoints HTTP
│   │   ├── controllers/     -- réception requête, validation
│   │   ├── services/        -- logique métier
│   │   ├── models/          -- accès aux données (requêtes SQL)
│   │   └── index.js         -- point d'entrée du serveur
│   ├── .env
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── RegisterForm/
│   │   │   ├── LoginForm/
│   │   │   └── Dashboard/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

Le backend suit une architecture en couches :

```
routes → controllers → services → models
```

- **routes** : définition des endpoints HTTP
- **controllers** : réception de la requête, validation, appel des services
- **services** : logique métier
- **models** : accès aux données (requêtes SQL paramétrées via `pg`)

L'authentification utilise des tokens JWT : après connexion, le frontend stocke le token et l'envoie dans le header `Authorization: Bearer <token>` sur les routes protégées.
