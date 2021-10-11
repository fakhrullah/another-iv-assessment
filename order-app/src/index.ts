import dotenv from 'dotenv';
import fastify from 'fastify';
import { FastifyCorsOptions } from 'fastify-cors';

dotenv.config();

const server = fastify();

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

server.register(require('fastify-cors'), corsConfig);
server.register(require('./routes/orders'), { prefix: '/orders' });

server.get('/ping', async () => 'pong pong pong\n');

server.listen(4000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
