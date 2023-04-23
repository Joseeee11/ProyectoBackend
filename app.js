var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var espaciosRouter = require('./routes/espacios.r');
var equiposRouter = require('./routes/equipo.r');
var solicitantesRouter = require('./routes/solicitante.r');
var personalRouter = require('./routes/personal.r');
var trabajosRouter = require('./routes/trabajos.r');
var reserva_espaciosRouter = require('./routes/reserva_espacios.r');
var reserva_equiposRouter = require('./routes/reserva_equipos.r');
var loginRouter = require('./routes/login.r');
var logoutRouter = require('./routes/logout.r');
var mantenimientoEquipoRouter = require('./routes/m_equipo.r');
var mantenimientoEspacioRouter = require('./routes/m_espacio.r');
var eventosRouter = require('./routes/eventos.r');

var app = express();

//PUERTO
app.set('port', process.env.PORT || 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/espacios', espaciosRouter);
app.use('/equipos', equiposRouter);
app.use('/solicitantes', solicitantesRouter);
app.use('/personal', personalRouter);
app.use('/trabajos', trabajosRouter);
app.use('/reserva_espacios', reserva_espaciosRouter);
app.use('/reserva_equipos', reserva_equiposRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/mantenimientoEquipo', mantenimientoEquipoRouter);
app.use('/mantenimientoEspacio', mantenimientoEspacioRouter);
// app.use('/eventos', eventosRouter); //crashea no se porque
app.use('/eventos', eventosRouter);


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
