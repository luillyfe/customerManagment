FROM node:8
WORKDIR /usr/shared/app
LABEL author="Fermin Blanco"
COPY package*.json /usr/shared/app/
RUN npm install --production
COPY . /usr/shared/app
EXPOSE 4040
CMD [ "npm", "start" ]
