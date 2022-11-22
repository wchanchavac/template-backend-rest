require('dotenv').config()
const boom = require('@hapi/boom')

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// database instance
const db = require('./database');

app.use(logger('dev'));
app.use(cors({
    origin: true,
    credentials: true,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function setContext(req, res, next) {
    req.db = db;
    next()
});

app.use('/', indexRouter);

app.use('/api/v1', usersRouter);


app.use((err, req, res, next) => {
    console.error(err.stack)
    if (!err?.isBoom) {
        err = boom.boomify(err)
    }

    const { output: { statusCode, payload } } = err;

    res.status(statusCode).json(payload)
})

module.exports = app;
