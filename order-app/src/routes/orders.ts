import { FastifyContext, FastifyInstance, FastifyPluginOptions, FastifyRequest, RequestGenericInterface, RouteHandler, RouteOptions } from "fastify"

module.exports = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: any) => {

  // Fetch all
  fastify.get('/', {}, (req, reply) => {
    reply.send('hello');
  });

  // Create order
  fastify.post('/', {}, (req, reply) => {
    reply.send('hello create');
  });

  type OrderRequestUpdate = FastifyRequest<{
    Params: {id: string}
  }>

  // Update order
  fastify.put('/:id', {}, (req: OrderRequestUpdate, reply) => {
    const { id } = req.params;
    reply.send('hello ' + id);
  });

  type OrderRequestOne = FastifyRequest<{
    Params: {id: string}
  }>
  // Read an order
  fastify.get('/:id', {}, (req: OrderRequestOne, reply) => {
    const { id } = req.params;
    reply.send('hello ' + id);
  });

  done();
}