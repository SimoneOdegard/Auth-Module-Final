'use strict'

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./auth/routes.js');
const v1Routes = require('./routes/v1.js');
const v2Routes = require('./routes/v2.js');
const notFound = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    app.listen(port, () => {
      console.log(`Port is up on ${port}`)
    })
  }
}