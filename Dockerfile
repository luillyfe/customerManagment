FROM node:8
WORKDIR /usr/shared/customManagmnet
LABEL author="Fermin Blanco"
COPY ./dist package*.json ./
RUN npm install --network-timeout 1000000
EXPOSE 80
CMD [ "npm", "start" ]
