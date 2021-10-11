import {
  FastifyInstance, FastifyPluginOptions, FastifyRequest,
} from 'fastify';
import { Knex } from 'knex';

interface FastifyInstanceWithKnex extends FastifyInstance {
  knex: Knex
}

module.exports = (fastify: FastifyInstanceWithKnex, opts: FastifyPluginOptions, done: any) => {
  // Fetch all
  const getAllOrderOpts = {
    schema: {
      headers: {
        user_id: { type: 'string' },
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
      fastify.knex.schema.createTable('cats', (table) => {
        table.uuid('id');
        table.string('isPersian');
      })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log('--------errror-----------');
          console.log(err);
        });
      // console.log(catsTable);
      // fastify.knex('cats').insert({ isPersian: 'yes lah' });
      reply.send('hello');
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
  fastify.get('/:id', {}, (req: OrderRequestOne, reply) => {
    const { id } = req.params;
    reply.send(`hello ${id}`);
  });

  done();
};
