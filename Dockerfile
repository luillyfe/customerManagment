FROM node:8
WORKDIR /usr/src/app
LABEL author="Fermin Blanco"
COPY ./dist package*.json angular.json ./
RUN npm install
RUN npm i -g @angular/cli
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]
