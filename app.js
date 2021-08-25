const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const book = require('./routes/book')
const movie = require('./routes/movie')
const app = express();
const bodyParser = require("body-parser");
const mail = require("./public/javascripts/mail");

//db Connection
const db = require('./helper/db')()

//config
const config = require('./config')
app.set('api_secret_key',config.api_secret_key)

//middleware

const verifyToken = require('./middleware/verify-token')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/book',book);
app.use('/api/movie',movie);
app.use('/register',indexRouter)
app.use('/authenticate',indexRouter)
app.use('/api',verifyToken)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({error:{ message: err.message, code:err.code}});
});

module.exports = app;
