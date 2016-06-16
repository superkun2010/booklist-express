
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('author').del(),

    // Inserts seed entries
    knex('author').insert({author_id: 1, author_name: 'JK Rowling'}),
    knex('author').insert({author_id: 2, author_name: 'Orson Scott Card'}),
    knex('author').insert({author_id: 3, author_name: 'Mickey Mouse'})
  );
};
