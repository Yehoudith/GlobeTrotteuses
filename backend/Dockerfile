<<<<<<< HEAD
FROM node:20-alpine
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
=======
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]
>>>>>>> de4ca0ee91eefce17a31dbd13f17636590236926
