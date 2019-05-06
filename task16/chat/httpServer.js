const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const sessionStore = require('controllers/sessionStore');
const authController = require('controllers/auth');
const config = require('config');

const indexRouter = require('./routes/index');
const chatRouter = require('./routes/chat');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: config.get('session:name'),
  resave: false,
  saveUninitialized: false,
  secret: config.get('session:secret'),
  store: sessionStore.getStore(),
  cookie: {
    maxAge: config.get('session:lifetime'),
    sameSite: true,
    secure: config.get('session:in_prod'),
  }
}));

app.use(authController.allowUserToPage);

// Routes prefix
app.use('/', indexRouter);
app.use('/chat', chatRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
