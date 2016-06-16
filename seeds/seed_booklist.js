
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('booklist').del(),

    // Inserts seed entries
    knex('booklist').insert({booklist_id: 1, booklist_name: 'Kun Booklist'}),
    knex('booklist').insert({booklist_id: 2, booklist_name: 'Yeshe Booklist'})
  );
};
