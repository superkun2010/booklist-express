var express = require("express");
var app = express();
var booklistRouter = require('./routes/booklistrouter.js');
var apiRouter = require('./routes/apirouter.js');
var bodyParser = require('body-parser');
var morgan = require('morgan');

const PORT=8080;

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'hbs');

app.get('/', function (req, res) {
	res.render('form');
});

app.use('/booklist', booklistRouter);
app.use('/api', apiRouter);

app.listen(PORT);


module.exports = {
  app: app
};
