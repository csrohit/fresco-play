var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var env = require('dotenv').load();
var port = process.env.PORT || 5000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// index path
app.get('/', function(req, res) {
  console.log('app listening on port: ' + port);
  res.send('Welcome to bookstore');
});


module.exports = app;
