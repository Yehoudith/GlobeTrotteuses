# Rapport d'audit sécurité — Arc 3

## 1. Audit des dépendances

`pnpm audit` a identifié **3 vulnérabilités** :
- 1 haute
- 2 modérées

Toutes portent sur des **dépendances transitives**, sans correctif disponible qui n'introduise de breaking change. **Documentées comme risque accepté.**

## 2. Faille OWASP corrigée — A07 (Identification and Authentication Failures)

**Problème** : le login renvoyait un message d'erreur différent selon qu'un email existait en base ou non, ce qui permettait d'énumérer les comptes existants.

**Correction** : remplacement par un message générique unique, quel que soit le cas (email inexistant ou mot de passe incorrect).

## 3. Secrets externalisés

Le mot de passe de la base de données et le `JWT_SECRET`, auparavant écrits en dur dans `docker-compose.yml` (versionné), ont été déplacés vers un fichier `.env` **non versionné**. Un `.env.example` a été ajouté pour l'équipe, listant les variables attendues sans leurs valeurs.

## Dette assumée — non corrigée

**Route `GET /tasks` (IDOR — OWASP A01, Broken Access Control).** La route accepte encore un accès sans vérification fine du propriétaire de la ressource demandée : un utilisateur authentifié peut potentiellement accéder aux tâches d'un autre utilisateur. La correction est identifiée (vérification `req.user.id === task.ownerId` côté controller) mais n'a pas pu être implémentée par manque de temps sur l'Arc 3.
