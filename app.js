const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);

app.use((req, res, next) => {
  const error = new Error("Wrong URL !");
  error.statusCode = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.log('err.statusCode :>> ', err.statusCode);
  if (err.statusCode) {
    return res.status(err.statusCode).send(err.message)
  } else {
    return res.status(500).send(err.message)
  }
})

module.exports = app;
