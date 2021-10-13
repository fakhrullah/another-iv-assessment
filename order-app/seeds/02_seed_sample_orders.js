
exports.seed = function(knex) {
  // Get 
  return knex('orders').del()
    .then(function (order_details) {
      // Inserts seed entries
      return knex('orders').insert([
        {
          notes: 'Esse amet veniam veniam nulla commodo.',
          total_price: 1200,
          phone_num: '+123455423',
          status: 'created',
          user_id: '3432323-332323-423432323'
        },
        {
          notes: 'Cillum aute ipsum veniam ea aliqua pariatur incididunt laboris aliqua ea officia.',
          total_price: 2200,
          phone_num: '+123455423',
          status: 'delivered',
          user_id: '9876983-332323-423432323'
        },
        {
          total_price: 4500,
          phone_num: '+8021424332423',
          status: 'created',
          user_id: '23490-892743082-2343234'
        },
        {
          notes: 'Velit sit officia adipisicing adipisicing ullamco Lorem ullamco non.',
          total_price: 4200,
          phone_num: '+123455423',
          status: 'delivered',
          user_id: '3432323-332323-423432323'
        },
        {
          notes: 'Velit in nisi consequat est eu dolore tempor in aliqua sint consectetur.',
          total_price: 34200,
          phone_num: '+123455423',
          status: 'cancelled',
          user_id: '3432323-332323-423432323'
        },
        {
          total_price: 7600,
          phone_num: '+123455423',
          status: 'confirmed',
          user_id: '3432323-332323-423432323'
        },
        {
          total_price: 9300,
          phone_num: '+123455423',
          status: 'created',
          user_id: '3432323-332323-423432323'
        },
        {
          notes: 'Tempor laboris voluptate aliquip sunt commodo anim.',
          total_price: 4300,
          phone_num: '+123455423',
          status: 'confirmed',
          user_id: '3432323-332323-423432323'
        }
      ]);
    });
};