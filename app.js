var express = require("express");
var app = express();

//Put all books in this global booklist - don't create new booklists!
var books = new Booklist();


module.exports = {
  app,
  books
}
