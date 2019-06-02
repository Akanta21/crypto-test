FROM node:10-alpine
RUN mkdir /app/
RUN mkdir /app/server
WORKDIR /app/server

# Install yarn and other dependencies via apk
RUN apk update && apk add yarn python g++ make && rm -rf /var/cache/apk/*

COPY package.json ./
COPY yarn.lock ./

RUN yarn install
COPY .babelrc ./
COPY src ./src

ENV PORT 8080
EXPOSE $PORT

CMD yarn start
