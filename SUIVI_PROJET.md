# Suivi du projet JeuxVideOPS — Walid & Raphaël

> Dernière mise à jour : 15 avril 2026

---

## État global

| Critère du sujet | Walid — Two Ships | Raphaël — Space Invaders |
|---|:---:|:---:|
| Déclenchement workflow (push + PR + manuel) | ✅ | ✅ |
| Tests unitaires fournis (sujet) | ✅ | ✅ |
| 5 tests unitaires supplémentaires | ✅ | ✅ |
| 3 tests fonctionnels | ✅ | ✅ |
| Linter Google JS Style Guide | ✅ | ✅ |
| Annotations `::error::` dans la CI | ✅ | ✅ |
| Résumé `$GITHUB_STEP_SUMMARY` | ✅ | ✅ |
| npm audit | ✅ | ✅ |
| Dockerfile | ✅ | ❌ |
| Déploiement GitHub Pages (workflow) | ✅ | ❌ (à refaire proprement) |
| Page d'accueil commune | ❌ | ❌ |

---

## Walid — Two Ships Passing In The Night

### Ce qui est fait ✅
- CI complète : lint, tests unitaires, tests fonctionnels (Playwright), npm audit, annotations, résumé
- 6 tests unitaires du sujet (math.test.js)
- 5 tests unitaires supplémentaires (vec3.test.js)
- 3 tests fonctionnels Playwright (functional.spec.js)
- Dockerfile multi-stage (node:20-slim → nginx)
- Workflow de déploiement GitHub Pages (deploy-two-ships.yml)

### Ce qu'il reste à faire

- [ ] **Corriger le script `lint` en CI** : `npm run lint` utilise `--fix` ce qui modifie les fichiers sans les committer. Créer un script `lint:check` (sans `--fix`) pour la CI, garder `lint` pour l'usage local
- [ ] **Supprimer `.eslintrc.json`** : doublon avec `.eslintrc.js`, prête à confusion

---

## Raphaël — Space Invaders

### Ce qui est fait ✅
- CI complète : lint, tests unitaires, tests fonctionnels (Playwright), npm audit, annotations, résumé
- Tests unitaires du sujet + supplémentaires
- 3 tests fonctionnels Playwright
- ESLint configuré avec Google Style Guide + TypeScript

### Ce qu'il reste à faire

- [ ] **Créer un Dockerfile** pour Space Invaders (node builder → nginx avec le build Parcel)
- [ ] **Refaire `deploy-space-invaders.yml`** : la version actuelle utilise des actions obsolètes (`checkout@v2`, `JamesIves@releases/v3`), n'a pas de `working-directory`, et ne vérifie pas que la CI passe avant de déployer. À réécrire comme `deploy-two-ships.yml`

---

## Collectif — Ce qu'il reste à faire ensemble

C'est la partie la plus importante restante du projet.

### 1. Page d'accueil commune (obligatoire)
Le sujet demande **une appli web** qui présente les deux jeux et permet d'y jouer.

- [ ] Créer un dossier `web/` à la racine avec une page HTML simple listant les deux jeux
- [ ] La page doit avoir des liens vers chaque jeu déployé sur GitHub Pages
- [ ] Créer un `Dockerfile` pour cette page (nginx)

### 2. Déploiement global cohérent (obligatoire)
- [ ] S'assurer que les deux jeux sont bien accessibles en ligne via GitHub Pages
- [ ] Le déploiement ne doit se déclencher que si la CI passe (utiliser `needs:` dans les workflows)
- [ ] Utiliser des **GitHub Secrets** pour tout token ou credential (aucun en clair dans les fichiers)

### 3. Bonne pratiques DevSecOps (bonus)
- [ ] Vérifier qu'aucun secret n'est commité (Gitleaks ou truffleHog dans la CI)

---

## Récapitulatif des fichiers clés

| Fichier | Rôle | Statut |
|---|---|:---:|
| `.github/workflows/ci.yml` | CI Two Ships | ✅ |
| `.github/workflows/deploy-two-ships.yml` | Déploiement Two Ships | ✅ |
| `.github/workflows/ci-space-invaders.yml` | CI Space Invaders | ✅ |
| `.github/workflows/deploy-space-invaders.yml` | Déploiement Space Invaders | ❌ à refaire |
| `two-ships-passing-in-the-night/Dockerfile` | Image Docker Two Ships | ✅ |
| `two-ships-passing-in-the-night/tests/math.test.js` | Tests unitaires sujet | ✅ |
| `two-ships-passing-in-the-night/tests/vec3.test.js` | Tests unitaires supplémentaires | ✅ |
| `two-ships-passing-in-the-night/tests/functional.spec.js` | Tests fonctionnels | ✅ |
| `Space-Invaders/.../Dockerfile` | Image Docker Space Invaders | ❌ à créer |
| `web/index.html` | Page d'accueil commune | ❌ à créer |
| `web/Dockerfile` | Image Docker page d'accueil | ❌ à créer |

---

## Priorités immédiates

1. **Walid** → Corriger `lint:check` + supprimer `.eslintrc.json`
2. **Raphaël** → Créer le Dockerfile Space Invaders + refaire `deploy-space-invaders.yml`
3. **Ensemble** → Page d'accueil `web/` + déploiement global cohérent
