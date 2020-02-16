const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

let app = express();

require('./config/mongodb')();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('uploads'));

/**
 * Models
 */
require('./models/documentsModel');

/**
 * Routes
 */
require('./routes/documents')(app);


let httpServer = http.createServer(app);
httpServer.listen(4242);