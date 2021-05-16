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



// server.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'https://central.vercel.app'); // update to match the domain you will make the request from
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   next();
// });

// rutas
server.use(routes);
server.use(errorHandler);

// Error catching endware.

module.exports = server;
