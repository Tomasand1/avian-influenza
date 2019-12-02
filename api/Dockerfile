FROM node:10.13-alpine
ENV NODE_ENV development
WORKDIR /usr/api/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --development --silent && mv node_modules ../
RUN npm install gulp -g --silent
RUN npm install nodemon -g --silent
COPY . .
EXPOSE 8080
CMD [ "npm", "run", "start:dev"]