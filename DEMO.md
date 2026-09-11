# Scénario de démo — Arc 3

## Parcours utilisateur principal (~3 min)

1. **Installer** — configuration via `.env` (variables listées dans `.env.example`)
2. **Démarrer** — `docker compose up`
3. **Se connecter** — authentification via l'API (JWT + bcrypt)
4. **Créer un voyage** — passage par le frontend React connecté à l'API
5. **Voir les tâches** — affichage des tâches associées au voyage créé

## Cas d'erreur démontré volontairement

**Appel de `GET /tasks` sans en-tête d'authentification.**

Avant correction, cette route était accessible sans authentification. Démontré en direct :
1. Appel de la route sans token → réponse obtenue alors qu'elle n'aurait pas dû l'être
2. Explication du correctif appliqué : middleware `requireAuth` désormais imposé sur la route
3. Nouvel appel sans token → requête rejetée (401)

*Limite assumée non corrigée : le contrôle d'authentification est en place, mais le contrôle propriétaire fin (IDOR, OWASP A01) ne l'est pas encore — voir bilan technique.*

## Ce que la CI garantit à chaque Pull Request

- **Garanti** : le code passe le lint ESLint (0 erreur) et les tests unitaires (`node --test`) — sinon la fusion est bloquée.
- **Pas garanti** : couverture de tests exhaustive, absence totale de bug, tests de bout en bout.

**Preuve** : pipeline CI vert (19s) après correction en direct d'un conflit de version pnpm, initialement détecté grâce à un temps d'exécution anormalement court (~10s au lieu de ~40s).
