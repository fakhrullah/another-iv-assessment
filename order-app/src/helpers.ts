/* eslint-disable import/prefer-default-export */
import { OrderStatus } from './models/order_status';

export const isValidOrderStatus = (status: string): boolean => (<any>Object)
  .values(OrderStatus).includes(status);
