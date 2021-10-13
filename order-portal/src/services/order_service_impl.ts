import axios from 'axios';
import { OrderItemDetail, OrderModel, OrderModelSubmit } from '../models/OrderModel';
import { parseISO } from 'date-fns';

const sleep = (ms: number) => new Promise((resolve, reject) => setTimeout(resolve, ms));

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
  // Fetch an order
  const responseOrder = await axios({
    method: 'GET',
    url: `${process.env.REACT_APP_ORDER_APP_URL}/orders/${id}`,
    headers: {
      user_id: `${process.env.REACT_APP_USER_ID}`,
    },
  });

  // console.log(responseOrder.data);

  // Mapping data to OrderModel
  const { 
    // eslint-disable-next-line @typescript-eslint/naming-convention
    id: orderId, status, notes, phone_num, total_price, created_at, updated_at, order_detail, 
  } = (responseOrder.data as { order: any }).order as any;
  
  const order: OrderModel = {
    id: orderId,
    status,
    phoneNumber: phone_num,
    notes,
    createdAt: parseISO(created_at), 
    updatedAt: parseISO(updated_at),
    totalPrice: total_price,
    userId: `${process.env.REACT_APP_USER_ID}`,
    orderItemDetail: (order_detail as any[]).map<OrderItemDetail>((od) => ({
      id: od.id,
      name: od?.item_detail?.name ?? '',
      price: od?.item_detail?.price ?? 0,
    })),
  };

  // console.log(order);

  return order;
};

export const createOrder = async (order: OrderModelSubmit) => {
  console.log('success send data');

  // Mapping OrderModel to server data model
  const orderToSubmit = {
    notes: order.notes, 
    phone_num: order.phoneNumber,
    total_price: order.totalPrice, 
    order_detail: (order?.orderItemDetail?.map<{ item_detail: any }>((od) => {
      return ({
        item_detail: {
          name: od.name,
          price: od.price,
        },
      });
    })),
  };
  
  const responseOrder = await axios({
    method: 'POST',
    url: `${process.env.REACT_APP_ORDER_APP_URL}/orders`,
    headers: {
      user_id: `${process.env.REACT_APP_USER_ID}`,
    },
    data: orderToSubmit,
  });
  // await sleep(2);

  return (responseOrder.data as { order: Object }).order;
};
