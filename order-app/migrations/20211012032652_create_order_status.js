
exports.up = function(knex) {
  return knex.schema.withSchema('public').createTable('order_status', (table) => {
    table.string('key').primary();
    table.string('name');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.withSchema('public').dropTable('order_status');
};
