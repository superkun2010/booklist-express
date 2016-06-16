
exports.up = function(knex, Promise) {
	return knex.schema.createTable('book_booklist', function(table) {
		table.increments('book_booklist_id');
		table.integer('booklist_id').references('booklist.booklist_id');
		table.integer('book_id').references('book.book_id');
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('book_booklist');
};
