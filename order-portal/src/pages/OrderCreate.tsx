import React from 'react';
import { Container, Heading, Box, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
    
}

const OrderCreate = (props: Props) => {
  return (
    <Container>
      <Heading as="h1" textAlign="center" py="4">Create Order Form</Heading>
      
      <Box display="flex" justifyContent="end">
        <Button as={RouterLink} to="/">Home</Button>
      </Box>

    </Container>
  );
};

export default OrderCreate;
