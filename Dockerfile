FROM node:8
WORKDIR /Users/ferminblanco/WebstormProjects/customManagmnet
LABEL author="Fermin Blanco"
COPY . .
RUN npm install
RUN npm i -g @angular/cli
EXPOSE 80
CMD [ "npm", "start" ]
