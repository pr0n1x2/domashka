const createError = require('http-errors');
const helmet = require('helmet');
const express = require('express');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');
const User = require('models/user');
const config = require('config');
const session = require('express-session');

const { logger, express: expressLogger } = require('logger');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const addressRouter = require('./routes/address');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(expressLogger);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: config.get('session:name'),
  resave: false,
  saveUninitialized: false,
  secret: config.get('session:secret'),
  cookie: {
    maxAge: config.get('session:lifetime'),
    sameSite: true,
    secure: config.get('session:in_prod'), // Нужно менять на рабочем сервере с https
  }
}));
app.use((req, res, next) => {
  const notAuthPage = ['/login', '/register'];
  if (!req.session.userId) {
    if (notAuthPage.indexOf(req.url) !== -1) {
      next();
    } else {
      return res.redirect('/login');
    }
  } else {
    if (notAuthPage.indexOf(req.url) !== -1) {
      return res.redirect('/');
    } else {
      next();
    }
  }
});
app.use((req, res, next) => {
  const notUserRequiredPages = ['/address/google', '/address/photo'];
  const {userId} = req.session;
  if (userId) {
    if (notUserRequiredPages.indexOf(req.url) === -1) {
      User.findById(userId)
          .then((user) => {
            res.locals.user = user;
            next();
          });
    }
    else {
      next();
    }
  } else {
    next();
  }
});

let isRoutesEnabled = false;
app.use((req, res, next) => {
  if (isRoutesEnabled) {
    next();
    return;
  }

  next(createError(503));
});

// Routes prefix
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/address', addressRouter);
app.use('/register', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler. Don`t remove 'next' attribute
app.use((err, req, res, next) => {
  // logger.warn(err);
  console.log(err);

  res.status(err.status || 500);
  res.end();
});

const enableRoutes = () => {
  if (isRoutesEnabled === true) {
    // logger.warn('Routes already enabled');
    console.log('Routes already enabled');
    return;
  }

  isRoutesEnabled = true;
};

module.exports = app;
module.exports.enableRoutes = enableRoutes;
