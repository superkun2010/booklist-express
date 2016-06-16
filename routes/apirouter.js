var express = require("express");
var router = express.Router();
var books = require("../data/data.js").books;
var knex = require("../db/knex.js");
var pg = require('pg');

var conString = "postgres://kunhsu@localhost:5432/booklist_app_knex";

pg.connect(conString, function(err, client, done) {
    console.log("api connected");
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
    router.get('/book', function (req,res) {
		knex('book').select().then(function(data) {
			res.jsonp(data);
		})
	});
		
	router.get('/author', function (req,res) {
		knex('author').select().then(function(data) {
			res.jsonp(data);
		})
	});

	router.post('/author', function(req,res) {
		knex('author').insert({author_id: 5, author_name: 'Kun Hsu'})
		.then(function() {
			res.send();
		});
	})
});

module.exports = router;