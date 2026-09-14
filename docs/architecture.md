# Architecture globale — Les Globetrotteuses

## Schéma

```
[ Frontend ]  --  [ Backend ]  --  [ Database ]
 React/Vite       Express            PostgreSQL
                     |
        routes -- controllers -- services -- models
```

## Stack

- **Frontend** : React (TypeScript) + Vite
- **Backend** : Node.js / Express
- **Base de données** : PostgreSQL
- **Authentification** : JWT
- **Environnement** : Docker Compose (services `frontend`, `backend`, `database`)

## Backend — routes principales

- `POST /register` -- création d'un utilisateur
- `POST /login` -- connexion, retourne un JWT
- `GET /travel/check-travel` -- vérifie si un titre de voyage existe déjà
- `POST /travel/create-travel` -- création d'un voyage (protégée)
- `GET /travel` -- liste des voyages de l'utilisateur (protégée)

## Base de données — schéma simplifié

```
Users -- participate -- Travels
                            |
              -------------------------------
              |          |         |        |
        Accommodations Transports Activities Tasks
```

- **Users** -- comptes utilisateurs
- **Travels** -- voyages
- **participate** -- table de jointure Users <-> Travels
- **Accommodations / Transports / Activities** -- rattachées à un `travel_id`
- **Tasks** -- rattachées à un `travel_id` et un `user_id`, avec un statut et une catégorie

## Frontend — composants principaux

- `RegisterForm` -- inscription
- `LoginForm` -- connexion (JWT stocké en `localStorage`)
- `Dashboard` -- liste des voyages
- Tableau de bord d'un voyage -- sidebar : Tableau de bord, Hébergement, Transport, Activité, Tâches