const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { engine } = require('express-handlebars')

const indexRouter = require('./routes/index');
const linksRouter = require('./routes/links');
const authentificationRouter = require('./routes/authentification');

const flash = require('connect-flash')
const session = require('express-session')
const smysql = require('express-mysql-session')
const { database } = require('./keys')
const passport = require('passport')

// Initializations
const app = express();
require('./lib/passport')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')

}))
app.set('view engine', '.hbs');

// antes de flash hacemos uso de sesiones
app.use(session({
  secret: 'patata',
  resave: false,
  saveUninitialized: false,
  store: new smysql(database)
}))

// usamos flash
app.use(flash())

//middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize())
app.use(passport.session())

//globales
app.use( (req,res,next) => {
  app.locals.success = req.flash('success')
  next()
})

//rutas
app.use('/', indexRouter);
app.use('/', authentificationRouter);
app.use('/links', linksRouter);


app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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
