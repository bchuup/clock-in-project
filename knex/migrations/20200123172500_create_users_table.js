
exports.up = function(knex) {
  knex.schema.createTable('user', (table) => {
    table.increments('id')
    table.string('name')
  })
};

exports.down = function(knex) {
  
};
