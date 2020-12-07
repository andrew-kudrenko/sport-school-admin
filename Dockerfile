# pull official base image

FROM node:alpine

WORKDIR /app

COPY package.json /app

RUN yarn
RUN yarn run build

COPY . .
