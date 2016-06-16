
exports.up = function(knex, Promise) {
	return knex.schema.createTable('review', function(table) {
		table.increments('review_id');
		table.integer('review_text');
		table.integer('review_author');
		table.integer('book_id').references('book.book_id');
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('review');

};
