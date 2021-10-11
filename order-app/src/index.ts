import fastify from 'fastify';

const server = fastify();

server.register(require('./routes/orders'), { prefix: '/orders' });

server.get('/ping', async () => 'pong pong pong\n');

server.listen(4000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
