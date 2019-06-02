FROM node:10-alpine
RUN mkdir /app/server
WORKDIR /app/server
COPY package.json ./
COPY yarn.lock ./

RUN yarn install
COPY .babelrc ./
COPY src ./src

ENV PORT 8080
EXPOSE $PORT

RUN yarn build
CMD yarn start
