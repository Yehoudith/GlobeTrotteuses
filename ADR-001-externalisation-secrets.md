# ADR 001 — Externalisation des secrets (mot de passe BDD, JWT_SECRET)

## Statut

Acceptée — Arc 3

## Contexte

En V1, le mot de passe de la base de données et le `JWT_SECRET` étaient écrits en dur dans le fichier `docker-compose.yml`, lui-même versionné dans le dépôt Git. N'importe qui ayant accès au dépôt (y compris publiquement, si le repo devait devenir public) pouvait donc lire ces secrets directement dans l'historique Git. C'était identifié comme un point fragile à corriger dans le cadre de la baseline de sécurité de l'Arc 3.

## Décision

Les secrets ont été déplacés dans un fichier `.env`, explicitement exclu du versioning via `.gitignore`. Un fichier `.env.example` a été ajouté au dépôt, listant les noms des variables attendues (`DB_PASSWORD`, `JWT_SECRET`, etc.) sans leurs valeurs, pour que chaque membre de l'équipe puisse recréer son propre `.env` local.

## Alternatives écartées

- **Continuer à versionner les secrets dans `docker-compose.yml`** : rejeté immédiatement — c'est précisément le problème à corriger.
- **Utiliser un gestionnaire de secrets externe (Vault, AWS Secrets Manager, etc.)** : écarté car disproportionné pour la taille et la maturité actuelle du projet (V1 pédagogique, un seul environnement de développement), et aurait ajouté une dépendance et une complexité d'infrastructure non justifiées à ce stade.
- **Chiffrer les secrets directement dans le repo (git-crypt, SOPS)** : écarté pour les mêmes raisons de complexité disproportionnée, et parce que l'équipe n'avait pas le temps de mettre en place et documenter cet outillage pendant l'Arc 3.

## Conséquences

**Avantages** :
- Les secrets ne sont plus exposés dans l'historique Git.
- `.env.example` documente clairement les variables attendues pour tout nouveau contributeur.
- Solution simple, rapide à mettre en place, cohérente avec la taille du projet.

**Limites assumées** :
- Le `.env` reste un fichier en clair sur la machine de chaque développeuse — pas de chiffrement au repos.
- Cette approche ne serait pas suffisante pour un environnement de production réel ; elle devra être revue (gestionnaire de secrets dédié) si le projet évolue au-delà d'un contexte pédagogique.
