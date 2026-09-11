# Bilan technique & dette consciente — Arc 3

## Terminé

- Lint + tests bloquants en CI (GitHub Actions)
- Docker fonctionnel : 3 conteneurs (backend, frontend, database) démarrent et communiquent
- Secrets externalisés (`.env`, non versionné, avec `.env.example` pour l'équipe)
- Faille login corrigée (OWASP A07 — énumération de comptes via message d'erreur différencié, remplacé par un message générique unique)

## En cours / partiel

- Fusion Git multi-contributrices (conflits résolus au fil de l'eau)
- Documentation d'exploitation (runbook + `DEPLOIEMENT.md`)

## Pas fait — dette assumée

- **Route `GET /tasks` : contrôle propriétaire (IDOR, OWASP A01).** La route accepte encore un accès sans vérification fine du propriétaire de la ressource. Correction identifiée (ajout d'une vérification `req.user.id === task.ownerId` dans le controller), non implémentée par manque de temps.
- Environnement de recette / production (seul un environnement de développement existe actuellement)
- Couverture de tests au-delà de l'authentification (les tests actuels ne couvrent pas l'ensemble des routes)

## Ce qu'on a appris sur la phase de livraison

Un pipeline vert ne veut rien dire tant qu'on n'a pas vérifié qu'il tourne vraiment : un temps d'exécution anormalement court (10s au lieu des ~40s habituels) a suffi à révéler un conflit de version pnpm qui aurait pu passer inaperçu. Diagnostiquer avant de corriger, et documenter ce qu'on choisit sciemment de ne pas faire, fait autant partie du travail de livraison que d'écrire le code.
