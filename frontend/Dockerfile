# Étape unique : Build + Serve avec Angular CLI
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install --legacy-peer-deps  # --legacy-peer-deps pour ignorer les conflits de dépendances

# Copier tout le code source
COPY . .

# Exposer le port utilisé par Angular
EXPOSE 4200

# Lancer le serveur Angular
CMD ["npm", "run", "start"]
