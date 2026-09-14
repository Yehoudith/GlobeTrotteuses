FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm
RUN pnpm approve-builds bcrypt || true
RUN pnpm install

CMD ["pnpm", "dev"]