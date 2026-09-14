# Les Globetrotteuses

Application web qui permet d'organiser plus facilement des voyages entre amies.

## Contexte et problème

Lors de l'organisation d'un voyage entre amies d'un même groupe, les informations importantes (réservations, activités, décisions et autres tâches) sont souvent dispersées. Cela peut entraîner des oublis, des difficultés de préparation, des tensions au sein du groupe et des opportunités manquées qui peuvent mettre en péril le voyage.

## Objectifs & critères de succès

**Objectif** : permettre de répartir et de suivre les tâches pour l'organisation d'un voyage plus facilement entre les participants, et à une voyageuse de partager avec le reste du groupe les réservations faites.

Le projet est réussi si, à la fin de la période :
- une voyageuse peut créer une tâche ;
- une voyageuse peut ajouter une réservation ;
- le planning du jour peut être visualisé ;
- au moins une démo de bout en bout fonctionne sans bug bloquant.

## Périmètre V1

**Inclus (In)**
- Gestion des tâches de préparation du voyage
- Organisation des informations par catégories
- Système de vote
- Planning du voyage
- Tableau de bord récapitulatif (bonus)

**Exclus (Out)**
- Gestion du budget du voyage
- Paiement en ligne entre voyageurs
- Messagerie interne
- Notifications automatiques
- Gestion avancée des réservations
- Checklist de valise
- Gestion du matériel commun
- Stockage de documents de voyage
- Météo et informations locales
- Partage de photos
- Carte des voyages réalisés
- Géolocalisation en temps réel
- Application mobile native (iOS / Android)

## Rôles & responsabilités

| Rôle | Personne | Responsable de |
| --- | --- | --- |
| Coordination projet | Morgane | Suivi de l'avancement global du projet |
| Animation des dailys | À tour de rôle | Animation des points d'équipe |

## Conventions de travail

- **Dépôt :** GitHub — `https://github.com/Yehoudith/GlobeTrotteuses`
- **Branches :** `main` (stable) + une branche par fonctionnalité (`feat/nom-fonctionnalite`)
- **Commits :** un message clair au présent, de préférence en anglais (ex. `ajoute le formulaire de publication de trajet`)
- **Rituel d'équipe :** point de 15 min en début de chaque séance pour répartir le travail
- **Outils :** code sur VS Code, suivi des tâches sur un Kanban partagé

## Installation

### Prérequis

- Docker et Docker Compose installés
- Node.js et pnpm (pour le développement backend hors conteneur, optionnel)

### Configuration

1. Copier le fichier d'exemple des variables d'environnement :
```bash
   cp .env.example .env
```
2. Renseigner les valeurs attendues dans `.env` (mot de passe base de données, `JWT_SECRET`, etc. — voir `.env.example` pour la liste complète).

### Démarrer l'application

```bash
docker compose up -d --build
```

Cette commande construit et lance 3 conteneurs : `backend`, `frontend` et `database`.

### Initialiser la base de données (obligatoire au premier démarrage)

La base est créée vide : il faut appliquer le script de migration pour créer les tables.

```bash
docker exec -i globetrotteuse-db psql -U postgres -d globetrotteuse < db_manipulation/migration_up.sql
```

Sans cette étape, l'inscription échouera avec une erreur du type `relation "users" does not exist`.

### Vérifier que ça fonctionne

```bash
docker compose ps
```

Les 3 conteneurs doivent apparaître avec le statut `Up`. Rendez-vous ensuite sur `http://localhost:5173` pour utiliser l'application.

### Où regarder si ça casse

```bash
docker compose logs backend --tail=50
```

Voir également le runbook (`RUNBOOK.md`) pour la procédure d'incident détaillée.

### Backend seul (développement, hors Docker)

```bash
cd backend
pnpm install
```