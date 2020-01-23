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
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: true
  }
}