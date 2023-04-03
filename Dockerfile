FROM node:latest
WORKDIR /usr/shared/app
LABEL author="Fermin Blanco"
COPY package*.json /usr/shared/app/
RUN npm install --production
COPY . /usr/shared/app
EXPOSE 80
CMD [ "npm", "start" ]
