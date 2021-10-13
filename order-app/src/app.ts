import fastify, { FastifyServerOptions } from 'fastify';
import { FastifyCorsOptions } from 'fastify-cors';
import { Knex } from 'knex';

type AppOptions = {
  corsOptions?: FastifyCorsOptions,
  knexOptions?: Knex.Config
} & FastifyServerOptions;

function build(opts: AppOptions = {}) {
  const server = fastify(opts);

  // server.register(require('fastify-knexjs'), databaseConfig);
  // eslint-disable-next-line global-require
  server.register(require('./plugins/knex'), opts.knexOptions);
  // eslint-disable-next-line global-require
  server.register(require('fastify-cors'), opts.corsOptions);

  server.get('/ping', async () => 'pong pong pong\n');
  // eslint-disable-next-line global-require
  server.register(require('./routes/orders'), { prefix: '/orders' });

  return server;
}

export default build;
