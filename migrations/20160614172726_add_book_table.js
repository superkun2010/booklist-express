
exports.up = function(knex, Promise) {
	return knex.schema.createTable('book', function(table) {
		table.increments('book_id');
		table.string('title');
		table.string('genre');
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('book');
};
