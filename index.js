var PORT = process.env.PORT || 3002;
var express = require('express');
var path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
var app = express();

const mongoose = require('mongoose');
const config = require('./config');

var http = require('http');
var server = http.Server(app);

const TaskScheduler = require('./taskScheduler/taskScheduler');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

server.listen(PORT, function () {
  console.log('server is running');
});

mongoose.connect(config.mongo_url, {}, async function (err) {
  if (err) console.log(err);

  console.log('start taskScheduler');
  let taskScheduler = new TaskScheduler();

  console.log('start define');
  await taskScheduler.define('taskName1', () => { console.log(`Running taskName1`) });
  taskScheduler.start();
});

