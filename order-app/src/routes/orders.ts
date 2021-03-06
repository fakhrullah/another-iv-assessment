import axios from 'axios';
import {
  FastifyInstance, FastifyPluginOptions, FastifyRequest,
} from 'fastify';
import { Knex } from 'knex';
import { isValidOrderStatus } from '../helpers';
import Config from '../configs/config';

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
          .select(['orders.*', 'order_status.key', 'order_status.name'])
          .from('orders')
          .join('order_status', { 'orders.status': 'order_status.key' })
          .where('user_id', user_id)
          .orderBy('orders.created_at', 'desc');

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

  type CreateOrderRequest = FastifyRequest<{
    Body: OrderModel
  }>;
  // Create order
  fastify.post(
    '/',
    getAllOrderOpts,
    async (req: CreateOrderRequest, reply) => {
      const order = req.body;
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { user_id } = req.headers;
      // append created status

      try {
        // filter out order_detail
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { order_detail, ...orderToInsert } = order;

        const createdOrder = await fastify.knex('orders')
          .insert({ ...orderToInsert, user_id, status: 'created' })
          .returning('*');

        const orderDetails = order_detail.map((od) => ({
          order_id: createdOrder[0].id,
          item_detail: od,
        }));

        const createdOrderDetail = await fastify.knex('order_detail')
          .insert(orderDetails)
          .returning('*');

        axios({
          method: 'POST',
          url: Config.PAYMENT_APP_URL,
          data: {
            order_id: createdOrder[0].id,
            user_id,
          },
        })
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .then((response) => {
            // console.log(response);
            console.log('Should trigger Payment');
          })
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .catch((err) => {
            console.log(err);
            console.log('ERROR trigger Payment service');
          });

        reply.send({ order: { ...createdOrder[0], order_detail: createdOrderDetail } });
      } catch (error) {
        reply.send(error);
      }
    },
  );

  type OrderRequestUpdate = FastifyRequest<{
    Params: {
      id: String
    },
    Body: {
      status: string
    }
  }>;

  // Update order status only
  // - because update order is not requirement
  fastify.put(
    '/:id/status',
    getAllOrderOpts,
    async (req: OrderRequestUpdate, reply) => {
      const { id } = req.params;
      const { status } = req.body;

      // validate - status
      if (!isValidOrderStatus(status)) {
        reply.send(new Error(`Status : ${status} is not available`));
        return;
      }

      try {
        const order = await fastify.knex('orders')
          .select('id, status')
          .where({ id })
          .update({ status })
          .returning('*');

        if (status === 'confirmed') {
          setTimeout(() => {
            fastify.knex('orders')
              .select('id, status')
              .where({ id })
              .update({ status: 'delivered' });
          }, 10_000);
        }

        reply.send(order);
      } catch (error) {
        reply.send(error);
      }
    },
  );

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

interface OrderDetailModel {
  item_detail: any
}

interface OrderModel {
  notes: string
  total_price: number
  phone_num: string
  order_detail: OrderDetailModel[]
}
