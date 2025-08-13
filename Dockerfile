FROM node:18.11.0-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R root:root /home/node/app

WORKDIR /home/node/app

RUN chmod -R 777 /home/node

COPY package*.json ./

USER root

RUN npm install --only=prod 

COPY --chown=root:root . .

RUN npm run build


CMD [ "npm", "start" ]