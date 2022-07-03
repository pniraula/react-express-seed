FROM node:latest

WORKDIR /opt/app


COPY package.json ./


RUN npm install --silent

RUN npm install react-scripts@3.4.1 -g --silent

COPY . .

EXPOSE 3000

CMD ["npm", "start"]