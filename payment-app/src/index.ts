import axios from 'axios';
import fastify, { FastifyRequest } from 'fastify';
import config from './config';

const server = fastify()

server.get('/health',{}, async (req, reply) => {
  reply.send('healthy')
})

type PaymentRequest = FastifyRequest<{
  Body: {
    order_id: string
    user_id: string
  }
}>

server.post(
  '/', 
  {},
  async (req: PaymentRequest, reply) => {
    const isOrderConfirmed: boolean = Math.floor(Math.random() * 100) % 2 === 0;
    const orderStatus: string = isOrderConfirmed ? 'confirmed' : 'cancelled';

    const {order_id, user_id} = req.body;

    axios({
      method: 'PUT',
      url: `${config.ORDER_APP_URL}/orders/${order_id}/status`,
      headers: {
        user_id,
      },
      data: {
        status: orderStatus,
      }
    })
      .then((response) => {
        // console.log(response);
        console.log('SHOULD Record data to database')
      })
      .catch(err => { 
        // console.log(err);
        console.log('Error update Order Status')
      });

    reply.send(`Payment ${orderStatus}`);
  }
);

server.listen(config.PORT, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server is listening at ${config.PORT}`)
})
