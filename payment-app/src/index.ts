import fastify from 'fastify';
import config from './config';

const server = fastify()

server.get('/', {}, async (req, reply) => {

  reply.send('success');
});

server.listen(config.PORT, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server is listening at ${config.PORT}`)
})
