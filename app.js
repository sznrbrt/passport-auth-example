const config = require('./config/server');

const PORT = config.PORT;

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');
const MONGOURL = config.MONGOURL;
const indexRoute = require('./routes/index.js');
const passport = require('passport');

require('./middleware/PassportMiddleware');

mongoose.Promise = Promise;

const app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

mongoose.connect(MONGOURL, err => {
  console.log(err || `MongoDB connected to ${MONGOURL}`);
});

app.use('/api', indexRoute);

const server = http.createServer(app);

// App start
server.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});
