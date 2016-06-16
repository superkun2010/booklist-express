
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({user_id: 1, user_name: 'Kun'}),
    knex('users').insert({user_id: 2, user_name: 'Yeshe'})
  );
};
