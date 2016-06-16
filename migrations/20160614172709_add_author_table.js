
exports.up = function(knex, Promise) {
	return knex.schema.createTable('author', function (table) {
		table.increments('author_id');
		table.string('author_name');
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('author');
};
