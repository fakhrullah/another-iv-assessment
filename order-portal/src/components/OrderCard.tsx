import React, { useState } from 'react';
import { OrderModel } from '../models/OrderModel';
import { Box, Flex, Button, Text } from '@chakra-ui/react';
import { convertCentsToRM } from '../libs/helpers';

interface Props {
  order: OrderModel
  onShowMore: (orderId: string) => OrderModel
}

const OrderCard = (props: Props) => {
  const { id, status, totalPrice } = props.order;

  const [showMoreDetail, setShowMoreDetail] = useState<boolean>(false);
  const [orderMoreDetail, setOrderMoreDetail] = useState<OrderModel |  undefined>(undefined);

  const onClickShowMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    const orderDetail = props.onShowMore(id);
    setShowMoreDetail(!showMoreDetail);
    setOrderMoreDetail(orderDetail);
  };

  return (
    <Box key={id} border="solid 1px #ccc" mb="1">
      <Flex alignItems="center" px="2" py="4">
        <Box flexGrow={1} >
          <Text>#{id}</Text>
          <Text>Status: {status.toUpperCase()}</Text>
          <Text>Price: {convertCentsToRM(totalPrice)}</Text>
        </Box>
        <Box width="12">
          <Button width="8" fontSize="10" onClick={onClickShowMore}>➕</Button>
        </Box>
      </Flex>
      {showMoreDetail && <OrderMoreDetail orderMoreDetail={orderMoreDetail} />}
    </Box>
  );
};

interface OrderMoreDetailProps {
  orderMoreDetail?: OrderModel
}

export const OrderMoreDetail = (props: OrderMoreDetailProps) => {
  const od = props.orderMoreDetail;

  if (od) {
    const { createdAt, orderItemDetail, userId, notes, updatedAt } = od;
    return (
      <Box bg="gray.300" px="2" py="4">
        <Text>Owner: {userId}</Text>
        { 
          orderItemDetail
            .map((item) => (<Text key={item.id}> {item.name} - {convertCentsToRM(item.price)} </Text>))
        }
        <Text>Note</Text>
        <Text>{notes}</Text>
        <Text>Created At: {updatedAt.toDateString()}</Text>
        <Text>Created At: {createdAt.toDateString()}</Text>
      </Box>
    );
  } 
  return <Box>Not found data</Box>;
};


export default OrderCard;
