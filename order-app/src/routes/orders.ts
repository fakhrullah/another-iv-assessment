import {
  FastifyInstance, FastifyPluginOptions, FastifyRequest,
} from 'fastify';
import { Knex } from 'knex';

export interface FastifyInstanceWithKnex extends FastifyInstance {
  knex: Knex
}

module.exports = (fastify: FastifyInstanceWithKnex, opts: FastifyPluginOptions, done: any) => {
  // Fetch all
  const getAllOrderOpts = {
    schema: {
      // Header required user_id
      headers: {
        type: 'object',
        required: ['user_id'],
        properties: {
          user_id: { type: 'string' },
        },
      },
    },
  };

  fastify.get(
    '/',
    getAllOrderOpts,
    async (req, reply) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { user_id } = req.headers;
      console.log(user_id);

      try {
        const orders = await fastify.knex
          .select('*')
          .from('orders')
          .join('order_status', { 'orders.status': 'order_status.key' })
          .where('user_id', user_id);

        const orderIds: string[] = orders.map<string>((order) => order.id);

        const orderDetails = await fastify.knex
          .select('*')
          .from('order_detail')
          // .leftJoin('order_detail', { 'orders.id': 'order_detail.order_id' })
          .whereIn('order_id', orderIds);

        const groupedOrderDetails = orderDetails.reduce((acc, curr) => {
          if (!acc[curr.order_id]) acc[curr.order_id] = []; // If this type wasn't previously stored
          acc[curr.order_id].push(curr);
          return acc;
        }, {});

        const mappedOrders = orders.map((order) => ({
          ...order,
          order_detail: groupedOrderDetails[order.id],
        }));

        // reply.send(orders);
        reply.send({ orders: mappedOrders });
      } catch (error) {
        reply.send(error);
      }
    },
  );

  // Create order
  fastify.post('/', {}, (req, reply) => {
    reply.send('hello create');
  });

  type OrderRequestUpdate = FastifyRequest<{
    Params: { id: string }
  }>;

  // Update order
  fastify.put('/:id', {}, (req: OrderRequestUpdate, reply) => {
    const { id } = req.params;
    reply.send(`hello ${id}`);
  });

  type OrderRequestOne = FastifyRequest<{
    Params: { id: string }
  }>;

  // Read an order
  fastify.get(
    '/:id',
    getAllOrderOpts,
    async (req: OrderRequestOne, reply) => {
      const { id } = req.params;
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { user_id } = req.headers;

      try {
        const order = await fastify.knex('orders')
          .select('*')
          .where({
            id,
            user_id,
          });

        const orderDetails = await fastify.knex('order_detail')
          .select('*')
          .where({
            order_id: order[0].id,
          });

        reply.send({
          order: {
            ...order[0],
            order_detail: orderDetails,
          },
        });
      } catch (error) {
        reply.send(error);
      }
    },
  );

  done();
};
