# Dockerfile para o Backend (Node.js)
FROM node:20-alpine
WORKDIR /app

# Copia o package.json e instala as dependências
COPY package*.json ./
RUN npm ci --omit=dev

# Copia o resto do código
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]