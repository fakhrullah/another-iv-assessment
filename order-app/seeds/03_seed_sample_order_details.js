
const choseRandomOrderId = (arrayOfOrder) => {
  const randomNumber = Math.floor(Math.random() * arrayOfOrder.length);
  const order = arrayOfOrder[randomNumber];
  // console.log(randomNumber);
  // console.log(order.id);
  return order.id;
}

const randomPrice = () => {
  return Math.floor((Math.random() * 100) + 5) * 100;
}

exports.seed = function(knex) {
  const tableName = 'order_detail';
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      return knex('orders').select('id');
    })
    .then(function (data) {
      console.log(data)

      const arrayOfOrderDetails = Array(20).fill().map(() => ({
        // console.log(choseRandomOrderId(data))
          order_id: choseRandomOrderId(data),
          item_detail: {
            price: randomPrice(),
          }
      }))

      // Inserts seed entries
      return knex(tableName).insert(arrayOfOrderDetails);
    });
};
