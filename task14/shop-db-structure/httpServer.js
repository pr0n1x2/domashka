const createError = require('http-errors');
const helmet = require('helmet');
const express = require('express');
const Seeder = require('seeder');

const { logger, express: expressLogger } = require('logger');

// const indexRouter = require('httpRoutes/index');
// const routesRouter = require('httpRoutes/routes');
// const stationsRouter = require('httpRoutes/stations');
// const mapRouter = require('httpRoutes/map');
// const traficRouter = require('httpRoutes/trafic');

const app = express();

// app.use(expressLogger);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let isRoutesEnabled = false;
app.use((req, res, next) => {
  if (isRoutesEnabled) {
    next();
    return;
  }

  next(createError(503));
});

// Routes prefix
// app.use('/', indexRouter);
// app.use('/routes', routesRouter);
// app.use('/stations', stationsRouter);
// app.use('/map', mapRouter);
// app.use('/trafic', traficRouter);

// Здесь просто заполняю таблицу данными
const seeder = new Seeder();
seeder.seed();

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler. Don`t remove 'next' attribute
app.use((err, req, res, next) => {
  logger.warn(err);

  res.status(err.status || 500);
  res.end();
});

const enableRoutes = () => {
  if (isRoutesEnabled === true) {
    logger.warn('Routes already enabled');
    return;
  }

  isRoutesEnabled = true;
};

module.exports = app;
module.exports.enableRoutes = enableRoutes;
