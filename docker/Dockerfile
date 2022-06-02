FROM node:18

# Consulte .env
EXPOSE 8546 

RUN apt-get update

RUN apt-get install -y sudo

RUN npm install -g npm@8.12.0

RUN mkdir /app

WORKDIR /app
