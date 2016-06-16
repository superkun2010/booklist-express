
exports.up = function(knex, Promise) {
	return knex.schema.createTable('user_book', function(table) {
		table.increments('user_book_id');
		table.integer('user_id').references('users.user_id');
		table.integer('book_id').references('book.book_id');
		table.boolean('read');
		table.timestamp('read_date');
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('user_book');

};
