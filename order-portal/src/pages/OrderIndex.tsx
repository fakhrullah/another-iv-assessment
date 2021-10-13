import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Heading, Box, Button } from '@chakra-ui/react';
import OrderCard from '../components/OrderCard';
// import { getAllOrders } from '../services/order_service_fake';
import { getAllOrders } from '../services/order_service_impl';
import { useQuery } from 'react-query';

interface Props {
    
}

const OrderIndex = (props: Props) => {
  // const orders:OrderModel[] = [...ordersData];

  const { data: orders } = useQuery('orders', getAllOrders, {
    refetchInterval: 5000,
  });


  return (
    <Container>
      <Heading as="h1" textAlign="center" py="4">Orders</Heading>
      
      <Box display="flex" justifyContent="end">
        <Button as={RouterLink} to="/create">Create</Button>
      </Box>

      {
        orders &&
        orders.map((order) => (
          <OrderCard order={order} key={order.id} />
        ))
      }

    </Container>
  );
};

export default OrderIndex;
