FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

run npm install

COPY . .

ARG CLIENT_PORT

EXPOSE ${CLIENT_PORT}

CMD ["sh", "-c", "docker-compose up -d && yarn typeorm migration:run && yarn dev"]

