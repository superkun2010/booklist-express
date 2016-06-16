
exports.up = function(knex, Promise) {
	return knex.schema.createTable('booklist', function(table) {
        table.increments('booklist_id');
        table.string('booklist_name');
        table.integer('current_book_id');
        table.integer('previous_book_id');
        table.integer('next_book_id');
    })
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('booklist');
};
