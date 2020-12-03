# pull official base image
FROM node:12.19.0-alpine

WORKDIR /app

COPY yarn.lock /app

RUN yarn install
RUN yarn

COPY . /app
