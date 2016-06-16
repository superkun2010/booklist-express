// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost:5432/booklist_app_knex',
    debug: true
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
