
Les Globetrotteuses
Application web qui permet d'organiser plus facilement des voyages entre amies.

Dernière mise à jour : 17/07/2026

Contexte et problème
Lors de l'organisation d'un voyage entre amies d'un même groupe, beaucoup d'informations importantes (réservations, activités, décisions collectives et tâches à accomplir) doivent être partagées. Sans outil centralisé, tout se disperse entre les messageries et les notes personnelles. Résultat : des oublis, des difficultés de préparation, des tensions au sein du groupe et des opportunités manquées qui peuvent mettre en péril le voyage.

Persona
Ada, 25 ans. Organise régulièrement des voyages en groupe avec ses amies, ses colocataires, ou son association étudiante. Jamais seule dans l'organisation — toujours plusieurs voix à coordonner.

Objectifs & critères de succès
Objectif : faciliter la prise de décision, la répartition et le suivi des tâches entre les participantes d'un voyage, et permettre à une voyageuse de partager ses réservations avec le reste du groupe.

Le projet est considéré comme réussi si, à la fin :

une voyageuse peut créer une tâche ;
une voyageuse peut ajouter une réservation ;
le planning du jour est consultable ;
au moins une démo de bout en bout se déroule sans bug bloquant.
Périmètre V1
Inclus (In)

Gestion des tâches de préparation du voyage
Organisation des informations par catégories
Système de vote
Planning du voyage
Tableau de bord récapitulatif (bonus)
Exclus (Out)

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
Stack technique
Front-end : React, Vite, TypeScript
Back-end : Node.js, Express.js
Base de données : PostgreSQL
Conteneurisation : Docker / Docker Compose
Communication : le front envoie une requête HTTP au back, qui applique la logique métier, interroge la base de données, et renvoie une réponse au format JSON.

Installation
Prérequis : Docker et Docker Compose installés.

bash
git clone https://github.com/Yehoudith/GlobeTrotteuses.git
cd Globetrotteuses
docker compose up -d
Une fois les conteneurs lancés, appliquer les migrations et les données de test :

bash
docker exec -i globetrotteuse-db psql -U postgres -d globetrotteuse < db_manipulation/migration_up.sql
docker exec -i globetrotteuse-db psql -U postgres -d globetrotteuse < db_manipulation/seed.sql
Le backend est disponible sur http://localhost:3000, le frontend sur http://localhost:5173.

Variables d'environnement : DATABASE_URL est définie directement dans docker-compose.yml pour l'environnement Docker (postgresql://postgres:postgres@database:5432/globetrotteuse).

État réel de la V1
Ce qui fonctionne

GET /tasks — lister les tâches d'un voyage
POST /tasks — créer une tâche
Ce qui est en cours ou repoussé

Ajouter une réservation (critère de succès n°2) — pas encore développé
Système de vote — reporté, toujours prévu pour la suite
Tableau de bord récapitulatif — pas encore développé
Création de voyage — route en cours de correction
Limites connues

Les messages d'erreur ne sont pas encore explicites sur tous les cas (par exemple, un travel_id inexistant renvoie une erreur générique)
Rôles & responsabilités
Rôle	Personne	Responsable de
Coordination projet	Morgane	Suivi de l'avancement global du projet
Animation des dailys	À tour de rôle	Animation des points d'équipe
Développeuse	Dienaba, Morgane, Yéhoudith	Développement des routes back-end
Organisation agile de l'équipe
Daily Meeting
Un point quotidien est organisé chaque jour après les cours, avant chaque séance de travail. Chaque membre répond à trois questions : qu'ai-je réalisé depuis le dernier point ? Sur quoi vais-je travailler aujourd'hui ? Ai-je rencontré des difficultés ou des blocages ?

Chaque personne est responsable de la présentation de ses propres tickets et de la mise à jour de leur statut avant ou pendant le Daily Meeting.

Animation des réunions
L'animation des Daily Meetings est assurée à tour de rôle. L'animateur lance la réunion, distribue la parole, veille au respect du temps imparti, et s'assure que les éventuels blocages sont identifiés.

Coordination du projet
Assurée par Morgane : suivi de l'avancement global, identification des risques ou retards, facilitation de la communication entre les membres, et respect de l'organisation définie.

Gestion des tickets
Chaque membre maintient le statut de ses tickets à jour, renseigne les informations nécessaires à leur compréhension, et signale rapidement tout blocage.

Règles Git et collaboration
Gestion des branches
La branche main représente la version stable du projet — toujours fonctionnelle, jamais modifiée directement. Toute nouvelle fonctionnalité, correction de bug ou amélioration est développée dans une branche dédiée créée à partir de la dernière version de main : chaque ticket correspond à une nouvelle branche.

Convention de nommage :

feature/nom-fonctionnalite pour les nouvelles fonctionnalités
bugfix/nom-correction pour les corrections de bugs
hotfix/nom-correction-urgente pour les corrections urgentes
Avant de commencer à développer, chaque membre récupère la dernière version du projet et crée sa branche de travail à partir de main.

Règles de commit
Les commits sont réalisés régulièrement, de préférence en anglais, pour conserver un historique clair. Un commit correspond à une modification cohérente et identifiable — plusieurs petits commits ciblés plutôt qu'un seul gros commit.

Convention : type: description courte

Type	Signification
feat	ajout d'une nouvelle fonctionnalité
fix	correction d'un bug
docs	modification de la documentation
style	mise en forme, sans impact fonctionnel
refactor	amélioration du code sans changement de comportement
test	ajout ou modification de tests
chore	maintenance ou configuration
Exemples : feat: add task creation feature, fix: resolve login validation issue, docs: update installation guide

Synchronisation du travail
Avant chaque session, s'assurer de travailler sur une version à jour du projet en récupérant les dernières modifications de la branche principale. Synchroniser régulièrement sa branche de travail avec main pour limiter les conflits.

Pull Requests
Aucune modification n'est fusionnée directement dans main. Une Pull Request est créée une fois le développement terminé ; le ticket est alors placé en "Review" dans le kanban, et une autre personne vérifie et valide la PR.

Chaque Pull Request contient : un résumé de l'objectif, une description des changements, les tests effectués, et toute information utile à la relecture.

Relecture du code
Toute Pull Request est relue par au moins un autre membre de l'équipe avant fusion, pour vérifier le bon fonctionnement, garantir le respect des conventions, détecter d'éventuelles erreurs, et favoriser le partage de connaissances. Les remarques formulées sont prises en compte avant validation.

Gestion des conflits
En cas de conflit Git, la personne concernée analyse les modifications en conflit avant de les résoudre. Aucune portion de code n'est supprimée sans compréhension préalable de son rôle ou sans échange avec la personne à l'origine des modifications. Une fois le conflit résolu, le projet est testé pour vérifier que le comportement attendu est toujours respecté.

Sécurité et fichiers ignorés
Sont exclus du dépôt : les fichiers contenant des secrets ou clés d'API, les variables d'environnement (.env), les dépendances locales (node_modules, .venv), et les fichiers de build. Ces éléments sont ajoutés au .gitignore.

Workflow Git complet
Mettre à jour sa branche locale à partir de main
Créer une branche dédiée à la tâche à réaliser
Développer la fonctionnalité ou effectuer la correction
Réaliser des commits réguliers et explicites
Pousser les modifications sur le dépôt distant
Créer une Pull Request
Faire relire la Pull Request par un membre de l'équipe
Corriger les remarques si nécessaire
Fusionner la Pull Request dans main après validation
Conventions de travail
Dépôt : GitHub — https://github.com/Yehoudith/GlobeTrotteuses
Outils : code sur VS Code, suivi des tâches et documentation sur ClickUp (kanban, backlog, user stories, ADR)
ADR 01 — Choix de l'outil de suivi du travail
Statut : accepté Date : 17/07/2026

Contexte
L'équipe devait choisir un outil pour organiser son travail : gérer les tickets sous forme de kanban et documenter le projet (V1, ADR…).

Options considérées
ClickUp : outil complet, permet de regrouper kanban, backlog, user stories, ADR et documentation au même endroit
Trello : répandu pour la gestion de tâches, uniquement kanban
Jira : répandu pour la gestion de tâches, jamais utilisé par l'équipe
Décision
ClickUp. L'outil permet de travailler en groupe sur des documents communs et sur un kanban avec des tickets, en centralisant tout le suivi du projet. Trello est écarté car limité au seul kanban. Jira est écarté car jamais utilisé par l'équipe.

Conséquences
Positives

Kanban, backlog, user stories, ADR et documentation regroupés au même endroit
L'équipe retrouve facilement toutes les informations du projet
Chaque membre peut consulter, modifier et suivre l'avancement des tâches en temps réel

Négatives
Certaines fonctionnalités avancées peuvent être restreintes sur la version gratuite

