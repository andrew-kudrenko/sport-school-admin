# pull official base image

FROM node:alpine

WORKDIR /app

COPY package.json /app

RUN yarn

COPY . .
