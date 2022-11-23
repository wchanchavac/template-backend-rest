require('dotenv').config()
const boom = require('@hapi/boom')

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const jwt = require('jwt-simple')

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

app.use('/api/v1', function name(req, res, next) {
    console.log(req.path);
    if (req.path === '/login') {
        return next()
    }

    const authorization = req.headers?.authorization;
    if (!authorization) {
        return next(boom.unauthorized())
    }

    try {
        const decoded = jwt.decode(authorization, process.env.JWT_KEY)
        req.user = decoded
        return next()
    } catch (error) {
        console.log(error);
        return next(boom.unauthorized())
    }

}, usersRouter);


app.use((err, req, res, next) => {
    console.error(err.stack)
    if (!err?.isBoom) {
        err = boom.boomify(err)
    }

    const { output: { statusCode, payload } } = err;

    res.status(statusCode).json(payload)
})

module.exports = app;
