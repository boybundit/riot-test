const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index', {
    title: 'Todo App',
    message: 'Welcome to Todo App!',
    data: {
      title: 'Todo List',
      items: [
        { title:'Item 1', done: true },
        { title:'Item 2', done: false }
      ]
    }
  });
});

app.post('/api/login', bodyParser.urlencoded({ extended: false }), function (req, res) {
  res.json(req.body);
});
app.get('/api/logout', function (req, res) {
  res.json({});
});

app.listen(80);
