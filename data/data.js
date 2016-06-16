

var Booklist = require("../models/booklist.js").BookList;
var Book = require("../models/books.js").Book;
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

module.exports = {
	books: books
};