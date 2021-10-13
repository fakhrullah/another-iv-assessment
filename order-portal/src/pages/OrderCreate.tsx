import React, { FormEvent, useState } from 'react';
import { v4 as genUuid } from 'uuid';
import { 
  Container, Heading, Box, Button,
  FormControl, FormLabel, Input, FormHelperText, 
  Textarea,
} from '@chakra-ui/react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { OrderItemDetail, OrderModel, OrderModelSubmit } from '../models/OrderModel';
import { useMutation } from 'react-query';
import { createOrder } from '../services/order_service_impl';

interface Props {
    
}

const OrderCreate = (props: Props) => {

  const initialOrder: OrderModelSubmit = {
    totalPrice: 0,
    orderItemDetail: [],
  };

  const history = useHistory();

  const [orderData, setOrderData] = useState<OrderModelSubmit>(initialOrder);
  
  const createOrderMutation = useMutation((orderToSubmit: OrderModelSubmit) => createOrder(orderToSubmit), {
    onSuccess: (data, variables, context) => {
      history.push('/');
    },
  });

  const onsubmit = (e: FormEvent): void => {
    e.preventDefault();
    // should do data validation
    // console.log(orderData);

    // Data validation before send
    createOrderMutation.mutate(orderData);

  };

  const onAddItem = () => {
    const randomUuid: string = genUuid();
    const newItem: OrderItemDetail = {
      id: randomUuid,
      name: `Item Name ${randomUuid.slice(0, 8)}`,
      price: Math.floor(((Math.random() * 4000) + 100)),
    };

    const newOrderItemDetails: OrderItemDetail[] = [...orderData.orderItemDetail, newItem];
    setOrderData({ ...orderData, orderItemDetail: newOrderItemDetails });
  };
  
  return (
    <Container>
      <Heading as="h1" textAlign="center" py="4">Create Order Form</Heading>
      
      <Box display="flex" justifyContent="end">
        <Button as={RouterLink} to="/">Home</Button>
      </Box>

      <Box>
        <form onSubmit={onsubmit}>
          <FormControl id="phoneNum">
            <FormLabel>Phone Number</FormLabel>
            <Input type="number"
              value={orderData?.phoneNumber || ''}
              onChange={(e) => setOrderData({ ...orderData, phoneNumber: e.target.value })}
            />
            <FormHelperText>Your contact number</FormHelperText>
          </FormControl>

          <FormControl id="totalPrice">
            <FormLabel>Total Price ( In cent. Example: write 1200 for RM 12.00)</FormLabel>
            <Input type="number"
              value={orderData?.totalPrice || ''}
              onChange={(e) => setOrderData({ ...orderData, totalPrice: parseInt(e.target.value) })}
            />
            <FormHelperText>Your contact number</FormHelperText>
          </FormControl>

          <FormControl id="notes">
            <FormLabel>Notes</FormLabel>
            <Textarea type="text"
              defaultValue=''
              value={orderData?.notes}
              onChange={(e) => setOrderData({ ...orderData, notes: e.target.value })}
            />
            <FormHelperText>Add notes</FormHelperText>
          </FormControl>

          <Button type="button" onClick={(e) => onAddItem()}>Randomly Add Item to Order</Button>

          <Box height="340px" bgColor="#f3f3f3" overflowY="auto" mt="1">
            {orderData?.orderItemDetail.map((item) => {
              return (<Box key={item.id} py="1" px="2">
                👉
                {' '}
                {item.name} - {item.price}
              </Box>);
            })}
          </Box>

          <Box textAlign="right">
            <Button type="submit" mt="2" colorScheme="teal">Submit</Button>
          </Box>
        </form>
      </Box>

    </Container>
  );
};

export default OrderCreate;
