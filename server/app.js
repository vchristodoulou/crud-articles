const express = require('express');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const indexRouter = require('./routes/index');
const articlesRouter = require('./routes/article.route');
const categoryRouter = require('./routes/category.route');

require('dotenv').config()


// Connecting to mongoDB Database
mongoose.Promise = global.Promise;
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/blog';
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(
        () => {
            console.log(`Database sucessfully connected! ${dbUrl}`)
        },
        error => {
            console.log('Could not connect to database : ' + error)
        }
    );

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "build")));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/categories', categoryRouter);

app.use('/', (req, res, next) => {
    console.log(req);
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
