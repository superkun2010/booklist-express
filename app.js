var express = require("express");
var app = express();

var books = []
var count = {
  val: 1
}


module.exports = {
  app,
  books,
  count,
}