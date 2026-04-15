# Suivi du projet JeuxVideOPS — Walid & Raphaël

> Dernière mise à jour : 14 avril 2026

---

## État global rapide

| Critère du sujet | Walid — Two Ships | Raphaël — Space Invaders |
|---|:---:|:---:|
| Déclenchement workflow (push + PR + manuel) | ✅ | ✅ |
| Tests unitaires fournis (sujet) | ✅ | ✅ |
| 5 tests unitaires supplémentaires | ✅ | ✅ |
| 3 tests fonctionnels | ✅ | ⚠️ (fragiles) |
| Linter Google JS Style Guide | ✅ | ✅ |
| Annotations & résumés workflow | ✅ | ❌ manquant |
| npm audit | ✅ | ⚠️ doublon dans le yml |
| Dockerfile | ✅ | ❌ manquant |
| Déploiement GitHub Pages | ✅ (workflow créé) | ❌ workflow dans le mauvais dossier |
| Page d'accueil commune | ❌ | ❌ |

---

## Problèmes identifiés

### Problème critique — Raphaël

**Les workflows de Space Invaders ne s'exécutent jamais sur GitHub.**

`ci-space-invaders.yml` et `deploy.yml` sont placés dans :
```
Space-Invaders/SpaceInvaders-.../github/workflows/
```
GitHub Actions ne lit **que** les workflows dans `.github/workflows/` à la **racine du repo**.
Ces fichiers sont donc complètement ignorés par GitHub. Il faut les déplacer à la racine.

### Problème mineur — Walid

**Deux fichiers ESLint en conflit** : `.eslintrc.js` ET `.eslintrc.json` coexistent dans `two-ships-passing-in-the-night/`. ESLint utilise `.eslintrc.js` (priorité plus haute) mais la présence des deux prête à confusion. Il faut supprimer `.eslintrc.json`.

**`npm run lint` utilise `--fix` en CI** : Le linter modifie automatiquement les fichiers pendant la CI sans que ces changements soient committés. En CI on devrait juste vérifier sans corriger. À séparer en deux scripts : `lint` (fix local) et `lint:check` (CI).

**`deploy-two-ships.yml` absent de `dev`** : Il est sur `main` (via PR mergée) mais pas encore redescendu sur `dev`. Il faut faire un `git merge main` sur `dev`.

### Problème mineur — Raphaël

**Étape `npm audit` en doublon** dans `ci-space-invaders.yml` (apparaît deux fois).

**Pas d'annotations ni de résumé** dans `ci-space-invaders.yml` (pas de `::error::`, pas de `$GITHUB_STEP_SUMMARY`).

**`deploy.yml` de Space Invaders obsolète** : utilise `actions/checkout@v2` et `JamesIves/github-pages-deploy-action@releases/v3` (versions très anciennes). À mettre à jour en v4/v5.

---

## Walid — Ce qu'il reste à faire

- [ ] Supprimer `.eslintrc.json` (doublon avec `.eslintrc.js`)
- [ ] Séparer `lint` et `lint:check` dans `package.json` pour la CI
- [ ] Merger `main` dans `dev` pour récupérer `deploy-two-ships.yml`
- [ ] Activer GitHub Pages dans les settings du repo (Raphaël doit le faire s'il ne l'a pas encore fait)

---

## Raphaël — Ce qu'il reste à faire

- [ ] **PRIORITÉ 1** : Déplacer `ci-space-invaders.yml` vers `.github/workflows/ci-space-invaders.yml` (racine du repo)
- [ ] **PRIORITÉ 1** : Déplacer ou réécrire `deploy.yml` vers `.github/workflows/deploy-space-invaders.yml`
- [ ] Supprimer le doublon `npm audit` dans `ci-space-invaders.yml`
- [ ] Ajouter annotations `::error::` et `$GITHUB_STEP_SUMMARY` dans la CI
- [ ] Créer un `Dockerfile` pour Space Invaders (nginx + build Parcel)
- [ ] Mettre à jour `deploy.yml` (actions v4/v5 au lieu de v2/v3)

---

## Collectif — Ce qu'il reste à faire ensemble

- [ ] Créer une **page d'accueil** HTML simple qui liste les deux jeux avec liens
- [ ] Créer un `Dockerfile` pour cette page d'accueil
- [ ] Créer un workflow de déploiement global conditionné à la réussite des deux CI
- [ ] Utiliser des **GitHub Secrets** pour tous les tokens (aucun credential en clair)

---

## Récapitulatif des fichiers clés

| Fichier | Rôle | Statut |
|---|---|:---:|
| `.github/workflows/ci.yml` | CI Two Ships | ✅ |
| `.github/workflows/deploy-two-ships.yml` | Déploiement Two Ships | ✅ sur main, absent de dev |
| `.github/workflows/ci-space-invaders.yml` | CI Space Invaders | ❌ mauvais emplacement |
| `.github/workflows/deploy-space-invaders.yml` | Déploiement Space Invaders | ❌ à créer |
| `two-ships-passing-in-the-night/Dockerfile` | Image Docker Two Ships | ✅ |
| `two-ships-passing-in-the-night/tests/math.test.js` | Tests unitaires sujet | ✅ |
| `two-ships-passing-in-the-night/tests/vec3.test.js` | Tests unitaires supplémentaires | ✅ |
| `two-ships-passing-in-the-night/tests/functional.spec.js` | Tests fonctionnels | ✅ |
| `Space-Invaders/.../Dockerfile` | Image Docker Space Invaders | ❌ à créer |
| `Dockerfile` (page d'accueil) | Image Docker plateforme | ❌ à créer |
