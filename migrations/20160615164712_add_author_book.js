
exports.up = function(knex, Promise) {
	return knex.schema.createTable('author_book', function(table) {
		table.increments('author_book_id');
		table.integer('author_id').references('author.author_id');
		table.integer('book_id').references('book.book_id');
	})
};

exports.down = function(knex, Promise) {
  	return knex.schema.dropTable('author_book');
};
