module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'clock_in_db'
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    searchPath: ['knex', 'public'],
    pool: { min: 0, max: 7 },
    ssl: true
  }
}