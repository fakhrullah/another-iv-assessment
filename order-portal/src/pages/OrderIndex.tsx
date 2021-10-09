import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Heading, Box, Button } from '@chakra-ui/react';
import { OrderModel, OrderStatus } from '../models/OrderModel';
import OrderCard from '../components/OrderCard';

interface Props {
    
}

const ordersData: OrderModel[] = [
  {
    id: 'a81bc81b-dead-4e5d-abff-90865d1e13b1',
    userId: 'e19cc48b-6ab6-44c8-a201-479ef017acfa',
    status: OrderStatus.CREATED,
    notes: '',
    orderItemDetail: [
      { id: '08ee1502-791b-4ca3-a807-bca7f51095bd', name: 'Kingston Thumbdrive', price: 3400 },
    ],
    totalPrice: 7800,
    createdAt: new Date(2021, 10, 6),
    updatedAt: new Date(2021, 10, 6),
  },
  {
    id: '944c64a1-41fe-4c72-aea6-a493c95d30a2',
    userId: 'e19cc48b-6ab6-44c8-a201-479ef017acfa',
    status: OrderStatus.CONFIRMED,
    notes: '',
    orderItemDetail: [
      { id: '911d64cd-44be-4fa8-b8ae-bea05fe8a3d6', name: 'Kingston Thumbdrive', price: 3400 },
      { id: '04581468-95ae-4e6b-bd1f-dd99a74e33cc', name: 'Dolor sit', price: 2400 },
      { id: '82f2ec48-de8e-4996-ab20-e06a2a5ed018', name: 'Lorem ipsum', price: 1400 },
    ],
    totalPrice: 7800,
    createdAt: new Date(2021, 10, 5),
    updatedAt: new Date(2021, 10, 6),
  },
  {
    id: '0a12f509-e0e6-4653-bc28-fc3bf871d0dd',
    userId: 'e19cc48b-6ab6-44c8-a201-479ef017acfa',
    status: OrderStatus.CANCELLED,
    notes: '',
    orderItemDetail: [
      { id: '353adc65-5740-4a78-9ce7-319da3d7a1c7', name: 'New thing', price: 3400 },
    ],
    totalPrice: 7800,
    createdAt: new Date(2021, 10, 4),
    updatedAt: new Date(2021, 10, 4),
  },
  {
    id: 'd1d6eae4-0547-4d9d-b824-02318760b25d',
    userId: 'e19cc48b-6ab6-44c8-a201-479ef017acfa',
    status: OrderStatus.DELIVERED,
    notes: '',
    orderItemDetail: [
      { id: 'ec8acd85-ab72-4182-a3de-1fc23f081d92', name: 'New thing', price: 3400 },
    ],
    totalPrice: 7800,
    createdAt: new Date(2021, 10, 4),
    updatedAt: new Date(2021, 10, 4),
  },
];

const OrderIndex = (props: Props) => {
  const orders:OrderModel[] = [...ordersData];

  const getOrderById = (id: string): OrderModel => orders
    .filter((elem) => elem.id === id)[0];

  const onShowMore = (id: string): OrderModel => {
    const orderMoreDetail = getOrderById(id);
    console.log(id);
    return orderMoreDetail;
  };

  return (
    <Container>
      <Heading as="h1" textAlign="center" py="4">Orders</Heading>
      
      <Box display="flex" justifyContent="end">
        <Button as={RouterLink} to="/create">Create</Button>
      </Box>

      {orders.map((order) => (
        <OrderCard order={order} key={order.id} onShowMore={onShowMore} />
      ))}

    </Container>
  );
};

export default OrderIndex;
