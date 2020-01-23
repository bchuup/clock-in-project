module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'clock_in_db'
    },
    migrations: {
      directory: __dirname + '/knex/migrations'
    }
  }
}