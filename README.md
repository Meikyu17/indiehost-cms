# IndieHost CMS - Blog Management System

Gestionnaire d'articles de blog construit avec Payload CMS, conçu pour être utilisé comme backend headless pour une page vitrine.

## Vue d'ensemble

Ce projet fournit une API de gestion de contenu (CMS headless) basée sur Payload CMS et Next.js. Il permet de créer, gérer et publier des articles de blog qui peuvent être consommés par n'importe quel frontend via l'API REST ou GraphQL.

### Fonctionnalités principales

- Interface d'administration Payload CMS intuitive
- Gestion d'articles de blog avec éditeur riche (Lexical)
- Gestion de médias (upload d'images)
- API REST et GraphQL auto-générées
- Authentification utilisateur sécurisée
- Base de données MongoDB

---

## Installation depuis zéro

### Prérequis

Avant de commencer, assurez-vous d'avoir installé sur votre machine :

- [Node.js](https://nodejs.org/) (version 18.20.2+ ou 20.9.0+)
- [pnpm](https://pnpm.io/) (version 9 ou 10)
- [Docker](https://www.docker.com/) et Docker Compose (pour MongoDB)

### Étape 1 : Cloner le repository

```bash
git clone <url-du-repo>
cd IndieHost-CMS
```

### Étape 2 : Configuration de l'environnement

Créez un fichier `.env` à la racine du projet avec le contenu suivant :

```env
# Database
DATABASE_URI=mongodb://127.0.0.1:27017/indiehost-blog

# Payload
PAYLOAD_SECRET=your-secret-key-change-this-in-production
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Next.js
NODE_ENV=development
```

**Important :** Changez `PAYLOAD_SECRET` par une chaîne aléatoire sécurisée pour la production.

### Étape 3 : Démarrer la base de données MongoDB

Supprimez la ligne `version: '3'` du fichier `docker-compose.yml` (elle est obsolète), puis lancez MongoDB :

```bash
docker-compose up -d
```

Cette commande démarre un conteneur MongoDB en arrière-plan.

### Étape 4 : Installer les dépendances

```bash
pnpm install
```

### Étape 5 : Lancer l'application en mode développement

```bash
pnpm dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

### Étape 6 : Créer votre premier utilisateur admin

1. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur
2. Suivez les instructions à l'écran pour créer votre compte administrateur
3. Connectez-vous au panel d'administration

---

## Utilisation

### Interface d'administration

- **Panel admin** : [http://localhost:3000/admin](http://localhost:3000/admin)
- Créez vos articles, gérez les médias et les utilisateurs depuis cette interface

### API REST

L'API REST est automatiquement générée et accessible sur :

- Articles : `http://localhost:3000/api/posts`
- Médias : `http://localhost:3000/api/media`
- Utilisateurs : `http://localhost:3000/api/users`

Documentation complète : [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### API GraphQL

L'API GraphQL est disponible sur :

- Endpoint : `http://localhost:3000/api/graphql`
- Playground : `http://localhost:3000/api/graphql-playground`

### Consommer l'API depuis votre frontend

Exemple de requête pour récupérer tous les articles :

```javascript
// REST API
const response = await fetch('http://localhost:3000/api/posts')
const data = await response.json()

// GraphQL
const query = `
  query {
    Posts {
      docs {
        id
        title
        content
        createdAt
      }
    }
  }
`
```

---

## Scripts disponibles

```bash
pnpm dev          # Démarre le serveur de développement
pnpm build        # Compile l'application pour la production
pnpm start        # Démarre le serveur de production
pnpm lint         # Vérifie le code avec ESLint
pnpm payload      # CLI Payload pour les opérations avancées
```

---

## Migration de données MongoDB

### Exporter les données depuis une autre machine

Sur la machine source :

```bash
# Si MongoDB tourne dans Docker
docker exec -it indiehost-cms-mongo-1 mongodump --db=indiehost-blog --out=/dump
docker cp indiehost-cms-mongo-1:/dump ./mongodb_backup

# Compresser le backup
tar -czf mongodb_backup.tar.gz mongodb_backup
```

### Importer les données sur cette machine

Après avoir transféré le fichier `mongodb_backup.tar.gz` :

```bash
# Décompresser
tar -xzf mongodb_backup.tar.gz

# Importer dans Docker
docker cp ./mongodb_backup/indiehost-blog indiehost-cms-mongo-1:/dump
docker exec -it indiehost-cms-mongo-1 mongorestore --db=indiehost-blog /dump/indiehost-blog
```

---

## Structure du projet

```
IndieHost-CMS/
├── src/
│   ├── app/              # Next.js App Router
│   ├── collections/      # Collections Payload (Posts, Media, Users)
│   ├── payload.config.ts # Configuration Payload CMS
│   └── ...
├── public/               # Fichiers statiques
├── docker-compose.yml    # Configuration MongoDB
├── .env                  # Variables d'environnement (à créer)
└── package.json
```

---

## Collections Payload CMS

### Posts (Articles)

Collection pour gérer les articles de blog avec :
- Titre
- Contenu riche (éditeur Lexical)
- Image de couverture
- Date de publication
- Statut (brouillon/publié)

### Media

Collection pour gérer les uploads de médias :
- Images avec redimensionnement automatique
- Point focal personnalisable
- Métadonnées

### Users

Collection d'authentification pour les administrateurs du CMS.

---

## Production

### Build pour la production

```bash
pnpm build
pnpm start
```

### Variables d'environnement pour la production

Assurez-vous de modifier ces variables dans votre `.env` de production :

- `PAYLOAD_SECRET` : Utilisez une clé secrète forte et unique
- `NEXT_PUBLIC_SERVER_URL` : URL publique de votre serveur
- `DATABASE_URI` : URI de votre base MongoDB de production
- `NODE_ENV=production`

---

## Dépannage

### Erreur : "cross-env n'est pas reconnu"

Lancez `pnpm install` pour installer toutes les dépendances.

### Erreur : "env file not found"

Créez un fichier `.env` à la racine du projet avec les variables nécessaires (voir Étape 2).

### MongoDB ne démarre pas

Vérifiez que Docker est en cours d'exécution et que le port 27017 n'est pas déjà utilisé :

```bash
docker ps
```

---

## Support

Pour toute question ou problème :

- [Documentation Payload CMS](https://payloadcms.com/docs)
- [Discord Payload](https://discord.com/invite/payload)
- [GitHub Issues](https://github.com/payloadcms/payload/discussions)
