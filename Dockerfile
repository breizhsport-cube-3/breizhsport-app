# Utiliser une image légère de Node.js basée sur Alpine Linux
FROM node:20-alpine

# Installer Make, et seulement installer Yarn s'il n'est pas déjà présent
RUN apk add --no-cache make && \
    if ! yarn --version >/dev/null 2>&1; then npm install -g yarn; fi

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier les fichiers de l'application dans le conteneur
COPY . .

# Installer les dépendances de l'application
RUN yarn install

# Commande par défaut : ouvrir un shell pour que l'utilisateur puisse entrer ses propres commandes
CMD ["sh"]