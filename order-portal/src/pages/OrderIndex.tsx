import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Heading, Box, Button } from '@chakra-ui/react';

interface Props {
    
}

const OrderIndex = (props: Props) => {
  const orders = ['abc', 'def', 'ghi', 'klm'];

  return (<Container>
        <Heading as="h1" textAlign="center" py="4">Orders</Heading>
        
        <Box display="flex" justifyContent="end">
          <Button as={RouterLink} to="/create">Create</Button>
        </Box>

        {orders.map((order) => (
          <Box key={order}>{order}</Box>
        ))}

      </Container>
  );
};

export default OrderIndex;
