FROM node:latest

WORKDIR /opt/api

ENV PATH /backend/node_modules/.bin:$PATH

COPY package.json ./

RUN npm install --silent

COPY . .

EXPOSE 5000

EXPOSE 6379

CMD ["npm", "start"]