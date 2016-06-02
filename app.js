var express = require("express");
var app = express();
var Booklist = require("./models/books.js").Booklist;
var Book = require("./models/books.js").Book;

//Put all books in this global booklist - don't create new booklists!
var books = new Booklist();


module.exports = {
  app,
  books
}
