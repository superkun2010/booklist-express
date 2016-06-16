
var express = require("express");
var router = express.Router();
var books = require("../data/data.js").books;
var knex = require("../db/knex.js");

console.log(books);

router.get('/', function (req,res) {
	res.jsonp(books['books']);
});

router.get('/next', function (req,res) {
	res.redirect(books.nextBook);
});

router.get('/current', function (req,res) {
	res.redirect(books.currentBook);
});

router.get('/previous', function (req,res) {
	res.redirect(books.previousBook);
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

module.exports = router;
