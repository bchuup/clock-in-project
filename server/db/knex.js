var env = process.env.NODE_ENV || 'DEVELOPMENT';
var config = require('../knexfile')[env];

module.exports = require('knex')(config);