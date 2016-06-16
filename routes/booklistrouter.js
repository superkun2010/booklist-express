
var express = require("express");
var router = express.Router();
var books = require("../data/data.js").books;
var knex = require("../db/knex.js");
var pg = require("pg");

var conString = "postgres://kunhsu@localhost:5432/booklist_app_knex";

pg.connect(conString, function(err, client, done) {
    console.log("booklist connected");
    var handleError = function(err) {
      // no error occurred, continue with the request
      if(!err) return false;

      // An error occurred, remove the client from the connection pool.
      // A truthy value passed to done will remove the connection from the pool
      // instead of simply returning it to be reused.
      // In this case, if we have successfully received a client (truthy)
      // then it will be removed from the pool.
      if(client){
        done(client);
      }
      res.writeHead(500, {'content-type': 'text/plain'});
      res.end('An error occurred');
      return true;
    };

	router.get('/', function (req,res) {
		knex('book').select().join('author_book','book.book_id','author_book.book_id').join('author', 'author_book.author_id', 'author.author_id').then(function(data) {
			var books = data;
			res.render('booktable', {books: books});		
		})		
	});

	// router.get('/next', function (req,res) {
	// 	res.redirect(books.nextBook);
	// });

	// router.get('/current', function (req,res) {
	// 	res.redirect(books.currentBook);
	// });

	// router.get('/previous', function (req,res) {
	// 	res.redirect(books.previousBook);
	// });

	router.get('/add-book', function (req,res) {
		res.render('form');
	});

	router.post('/add-book', function (req,res) {
		Promise.all([
			knex('book').insert({title: req.body.title, genre: req.body.genre}).returning('book_id'),
			knex('author').insert({author_name: req.body.author}).returning('author_id')
		]).then(function(data) {
			console.log(data[0][0]);
			console.log(data[1][0]);
			return knex('author_book').insert({author_id: data[1][0], book_id: data[0][0]});
		}).then(function(data) {
			res.redirect('/booklist');
		}).catch(function(error) {
			console.log(error);
			res.send(error);
		});		
	});

	router.get('/to-read', function (req,res) {
		res.render('booktable');
	});

	router.get('/finished', function (req,res) {
		res.render('booktable');
	});

	router.get('/:id', function (req,res) {
		if (books.books[req.params.id]) {
			var sendBook = [];
			var id = req.params.id;
			sendBook.push(books['books'][id]);
			res.jsonp(sendBook);
		} else {
			res.sendStatus(404);
		}
	});

    
});
module.exports = router;
