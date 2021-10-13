import axios from 'axios';
import { OrderModel } from '../models/OrderModel';

export const getAllOrders = async (): Promise<OrderModel[]> => {

  // Fetch all data
  const responseOrders = await axios({
    method: 'GET',
    url: `${process.env.REACT_APP_ORDER_APP_URL}/orders`,
    headers: {
      user_id: `${process.env.REACT_APP_USER_ID}`,
    },
  });

  // console.log(responseOrders.data);

  // Mapping data to OrderModel
  const orders = (responseOrders.data as { orders: any[] })
    .orders
    .map<OrderModel>(({ 
    id, status, notes, phone_num, total_price, created_at, updated_at, order_detail, 
  }) => ({
    id: id,
    createdAt: created_at, 
    status,
    phoneNumber: phone_num,
    notes,
    updatedAt: updated_at,
    totalPrice: total_price,
    userId: `${process.env.REACT_APP_USER_ID}`,
    orderItemDetail: order_detail,
  }));

  // throw new Error('Not implement yet');
  return orders;
};

export const getOrderById = async (id: string): Promise<OrderModel> => {
  throw new Error('Not implement yet');
};

export const createOrder = async () => {
  throw new Error('Not implement yet');
};
