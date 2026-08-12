# Utiliser une image Node.js légère
FROM node:18-alpine

# Créer le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier tout le reste du code source
COPY . .

# Exposer le port 3000 pour y accéder depuis Windows
EXPOSE 3000

# Commande pour démarrer le serveur
CMD ["node", "server.js"]