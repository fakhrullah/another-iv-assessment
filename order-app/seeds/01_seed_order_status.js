
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('order_status').del()
    .then(function () {
      // Inserts seed entries
      return knex('order_status').insert([
        {key: 'created', name: 'Created'},
        {key: 'cancelled', name: 'Cancelled'},
        {key: 'delivered', name: 'Delivered to customer'},
        {key: 'confirmed', name: 'Confirmed Order'},
      ]);
    });
};
