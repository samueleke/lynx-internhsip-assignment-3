FROM node:16-alpine

RUN npm i -g nodemon

USER node

RUN mkdir /home/node/assignment_III

WORKDIR /home/node/assignment_III

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

CMD ["npm", "run", "dev"]