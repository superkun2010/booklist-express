var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');

var Booklist = require("./models/books.js").BookList;
var Book = require("./models/books.js").Book;

//Put all books in this global booklist - don't create new booklists!
var books = new Booklist({
  "books": [
      {
        "title": "Eloquent JS",
        "author": "Marijn Haverbeke",
        "read": true, 
        "date": "Tue May 24 2016 15:28:01 GMT-0700 (PDT)"
      },
      {
        "title": "Javascript: The Good Parts",
        "author": "Douglas Crockford",
        "read": true, 
        "date": "Tue May 24 2016 17:28:01 GMT-0700 (PDT)"
      },
      {
        "title": "Think Python",
        "author": "Allen B. Downey",
        "read": false, 
        "date": null
      },
      {
        "title": "The Art of Deception: Controlling the Human Element of Security",
        "author": "Kevin Mitnick",
        "read": false, 
        "date": null
      }
    ],
    "currentBook": "/books/2",
    "previousBook": "/books/1",
    "nextBook" : "/books/3",
});

const PORT=8080;

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'hbs');

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

app.get('/books', function (req,res) {
	res.jsonp(books['books']);
});

app.get('/books/next', function (req,res) {
	res.redirect(books.nextBook);
});

app.get('/books/current', function (req,res) {
	res.redirect(books.currentBook);
});

app.get('/books/previous', function (req,res) {
	res.redirect(books.previousBook);
});



app.get('/books/:id', function (req,res) {
	if (books.books[req.params.id]) {
		var sendBook = [];
		var id = req.params.id;
		sendBook.push(books['books'][id]);
		res.jsonp(sendBook);
	} else {
		res.sendStatus(404);
	}
});

app.listen(PORT);


module.exports = {
  app,
  books
}
