var express = require("express");
var app = express();
var booklistRouter = require('./routes/booklistrouter.js');
var apiRouter = require('./routes/apirouter.js');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var knex = require("./db/knex.js");
var pg = require("pg");
var bcrypt = require("bcrypt");
var cookieParser = require("cookie-parser");

var conString = "postgres://kunhsu@localhost:5432/booklist_app_knex";
var userName = 'user';

const PORT=8080;

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("q24tq8y4tgqiuhgqliu4htq394t8qytiq3y4t"));

app.set('view engine', 'hbs');


app.get('/', function(req,res) {
	if (req.signedCookies.user) {
		userName = req.signedCookies.user;
		res.redirect('booklist');
	} else {
		res.redirect('/login');
	}
});

app.get('/login', function (req, res) {
	res.render('login', {layout: 'loginlayout'});
});

// app.use('/api', apiRouter);
app.use('/booklist', booklistRouter);

pg.connect(conString, function(err, client, done) {
	app.post('/login', function (req,res) {
		return knex('users').select().whereIn('user_name', req.body.userName)
		.then(function(user) {
			if (user) {
				userName = user[0].user_name;
				console.log(userName);
				if (bcrypt.compareSync(req.body.password, user[0].password)) {
					res.cookie("user", userName, {httpOnly: true, signed: true});
					res.redirect('/booklist');
				} else {
					res.send("Password doesn't match");
				}	
			} else {
				res.send("User Name not found");
			}
		})
	});

	app.get('/signup', function(req,res) {
		res.render('signup', {layout: 'loginlayout'});
	});

	app.post('/signup', function(req,res) {
		var encryptedPassword = bcrypt.hashSync(req.body.password, 8);
		return knex('users').insert({user_name: req.body.userName, password: encryptedPassword})
		.then(function(data) {
			res.redirect('/booklist');
		})
		
	});
});



app.listen(PORT);


module.exports = {
  app: app,
  userName: userName
};
