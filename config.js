module.exports = {
  environment: process.env.NODE_ENV || 'development',
  development: {
    url: 'dev postgres url',
    dialect: 'postgres',
  },
  production: {
    url: 'production postgres url',
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: true,
    },
  },
};