exports.up = function (knex) {
  return knex.schema.withSchema('public').createTable('orders', (table) => {
    // table.uuid('id').primary().default(knex.raw("(UUID())")); // mysql
    table.uuid('id').primary().default(knex.raw('uuid_generate_v4()'));
    table.string('notes');
    table.integer('total_price');
    table.string('phone_num');
    // order_detail is many to one, so added reference in order_detail instead one to many
    table.string('status');
    table.foreign('status').references('order_status.key')
    // user_id - one to one - this just store user_id in string
    // user_id not a foreign key because user data is handle by other micro-service
    table.string('user_id')
    // will add created_at & updated_at column
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.withSchema('public').dropTable('orders');
};
