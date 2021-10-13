
exports.seed = function(knex) {
  const tableName = 'orders';
  // Deletes ALL existing entries
  return knex('orders').join('order_detail', {'orders.id': 'order_detail.order_id'})
    .then(function (data) {
      console.log(data)

    });
};
