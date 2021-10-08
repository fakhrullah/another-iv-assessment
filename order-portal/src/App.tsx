import { Container, Heading, Box, Button } from '@chakra-ui/react';
import React from 'react';

function App() {
  const orders = ['abc', 'def', 'ghi', 'klm'];

  return (
    <div className="App">
      <Container>
        <Heading as="h1" textAlign="center" py="4">Orders</Heading>
        
        <Box display="flex" justifyContent="end">
          <Button>Create</Button>
        </Box>

        {orders.map((order) => (
          <Box key={order}>{order}</Box>
        ))}

      </Container>
    </div>
  );
}

export default App;
