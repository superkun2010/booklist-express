
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('book').del(),

    // Inserts seed entries
    knex('book').insert({book_id: 1, title: 'Harry Potter and the Sorcerers Stone', genre: 'children'}),
    knex('book').insert({book_id: 2, title: 'Enders Game', genre:'sci-fi'}),
    knex('book').insert({book_id: 3, title: 'Minnie Mouse', genre:'cartoon'})
  );
};
