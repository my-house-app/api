const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const errorHandler = require('./middleware/errorHandler.js');
const cors = require('cors')
require('./db.js');

const server = express();

server.name = 'API';

// middlerwares
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));


const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, 
};

server.use(cors(corsOptions));



// rutas
server.use(routes);
server.use(errorHandler);

// Error catching endware.

module.exports = server;
