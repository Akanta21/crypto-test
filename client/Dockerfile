FROM node:10-alpine

RUN mkdir /app
RUN mkdir /app/client
WORKDIR /app/client

COPY package*.json ./
RUN yarn install
COPY . .

EXPOSE 3000

CMD yarn start