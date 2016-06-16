var express = require("express");
var app = express();
var booklistRouter = require('./routes/booklistrouter.js');
var apiRouter = require('./routes/apirouter.js');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var knex = require("./db/knex.js");
var pg = require("pg");
var bcrypt = require("bcrypt");

var conString = "postgres://kunhsu@localhost:5432/booklist_app_knex";

const PORT=8080;

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'hbs');

app.get('/', function (req, res) {
	res.render('login', {layout: 'loginlayout'});
});

// app.use('/api', apiRouter);
app.use('/booklist', booklistRouter);

pg.connect(conString, function(err, client, done) {
	app.post('/', function (req,res) {
		console.log(req.body.userName);
		console.log(req.body.password);

		return knex('users').select().whereIn('user_name', req.body.userName)
		.then(function(user) {
			console.log(user);
			// if (user) {
			// 	var user
			// 	if (password matches) {
			// 		"success"
			// 		res.redirect('/booklist')
			// 	} else {
			// 		"Password doesn't match"
			// 	}	
			// } else {
			// 	"No user name by that name"
			// }
		})
		res.redirect('/');
	});

	app.get('/signup', function(req,res) {
		res.render('signup', {layout: 'loginlayout'});
	});

	app.post('/signup', function(req,res) {
		var encryptedPassword = bcrypt.hashSync(req.body.password, 8);
		return knex('users').insert({user_name: req.body.userName, password: encryptedPassword})
		.then(function(data) {
			console.log("hello");
			res.redirect('/booklist');
		})
		
	});
});





app.listen(PORT);


module.exports = {
  app: app
};
