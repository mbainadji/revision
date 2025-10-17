# ICT4D L2 - Site de Révision

Site de révision pour les étudiants d'ICT4D L2, permettant aux étudiants de se connecter selon leur option (Cybersécurité ou Génie Logiciel) et d'accéder à des ressources spécifiques.

## Fonctionnalités

- Connexion avec matricule et nom
- Sélection d'option (Cybersécurité/Génie Logiciel)
- Accès restreint aux contenus selon l'option
- Système de questions/réponses
- Interface administrateur
- Gestion des exercices

## Installation locale

1. Cloner le repository :
```bash
git clone <votre-repo-url>
cd revisions
```

2. Installer les dépendances :
```bash
npm install
```

3. Créer le fichier .env avec vos variables d'environnement :
```env
DATABASE_URL=votre_url_base_de_donnees
SUPABASE_URL=votre_url_supabase
SUPABASE_KEY=votre_cle_supabase
```

4. Démarrer le serveur :
```bash
npm start
```

## Déploiement

Le site est automatiquement déployé sur GitHub Pages à chaque push sur la branche main.