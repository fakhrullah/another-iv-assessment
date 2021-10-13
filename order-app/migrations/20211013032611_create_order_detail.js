
exports.up = function(knex) {
  return knex.schema.withSchema('public')
    .createTable('order_detail', (table) => {
      table.uuid('id').primary().default(knex.raw('uuid_generate_v4()'));
      table.uuid('order_id');
      table.foreign('order_id').references('orders.id');
      table.json('item_detail');
      table.timestamps();
    })
};

exports.down = function(knex) {
  return knex.schema.withSchema('public').dropTable('order_detail');
};
