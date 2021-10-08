export interface OrderModel {
  id: string
  status: OrderStatus
  // Person whom created the order
  userId: string
  // In a bigger system, this should have company (group)
  // So that, ACL, RBAC etc can be implemented
  notes?: string
  // Think of when you went buy ice-cream, snacks and drink.
  // After paid, you will get a receipt listing all items detail.
  // Order model is the receipt & OrderItemDetail is every items in list.
  orderItemDetail: OrderItemDetail[]
  // Price user paid - **use integer**.
  // If Ringgit Malaysia, use 100 for RM 1.00
  totalPrice: number
  phoneNumber?: string
  createdAt: Date
  updatedAt: Date
}

export enum OrderStatus {
  CREATED = 'created',
  CONFIRMED = 'confirmed',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export interface OrderItemDetail {
  id: string
  name: string
  price: number
}
