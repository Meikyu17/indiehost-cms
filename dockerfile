# Dockerfile
FROM node:18-alpine

# Création du répertoire de travail
WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du reste du code source
COPY . .

# Exposition du port (3000 est le défaut pour Payload v3/Next.js)
EXPOSE 3000

# Commande de démarrage (en mode développement pour commencer)
CMD ["npm", "run", "dev"]