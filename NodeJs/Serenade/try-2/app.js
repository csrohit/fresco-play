var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var env = require('dotenv').load();
var port = process.env.PORT || 5000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())
// index path
app.get('/', function (req, res) {
  console.log('app listening on port: ' + port);
  res.send('Welcome to bookstore');
});
app.get('/books:id', async (req, res) => {
  res.json({});
});
app.get('/', () => {
  res.redirect('/books');
})
app.get('/books', async (req, res) => {
  const books = await Book.findAll();
  return res.json(books);
});
app.post('/books', async (req, res) => {
  const book = await Book.create(req.body);
  res.json(book);
})

app.listen(port, () => {
  console.log('App listening on port ', port);
})


module.exports = app;
