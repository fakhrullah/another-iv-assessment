import fastify from 'fastify';
import { FastifyCorsOptions } from 'fastify-cors';

function build(opts = {}) {
  const server = fastify(opts);

  const corsConfig = (): FastifyCorsOptions => ({
    origin: (origin, cb) => {
      // Allow is env development
      if (process.env.NODE_ENV === 'development') {
        cb(null, true);
        return;
      }

      // Allow localhost
      if (/localhost/.test(origin)) {
        cb(null, true);
        return;
      }

      cb(new Error('Not allowed'), false);
    },
  });

  const databaseConfig = () => ({
    client: 'pg',
    connection: process.env.POSTGRESQL_CONNECTION_STRING,
    pool: { min: 0, max: 2 },
    searchPath: ['knex', 'public'],
  });

  // server.register(require('fastify-knexjs'), databaseConfig);
  // eslint-disable-next-line global-require
  server.register(require('./plugins/knex'), databaseConfig);
  // eslint-disable-next-line global-require
  server.register(require('fastify-cors'), corsConfig);

  server.get('/ping', async () => 'pong pong pong\n');
  // eslint-disable-next-line global-require
  server.register(require('./routes/orders'), { prefix: '/orders' });

  return server;
}

export default build;
