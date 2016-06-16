
exports.up = function(knex, Promise) {
	return knex.raw('ALTER TABLE users ADD password TEXT');
};

exports.down = function(knex, Promise) {
  
};
