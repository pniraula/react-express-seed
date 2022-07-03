const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());



app.use('/static', express.static(path.join(__dirname, './frontend/build/static')));

app.use('/api/v1', api);
app.get('*', (req, res) => {
  res.sendFile('./frontend/build/index.html', {root: __dirname});
});
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
