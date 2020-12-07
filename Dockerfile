# pull official base image

FROM node:alpine

WORKDIR /app

COPY . .

RUN yarn

