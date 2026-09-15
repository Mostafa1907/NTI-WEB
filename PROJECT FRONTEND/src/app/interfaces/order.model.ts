export interface OrderProduct {
  product: any;
  quantity: number;
  price: number;
}
export interface Order {
  id?: string;
  user?:any;
  products: OrderProduct[];
  subtotal?: number;
  deliveryFee?: number;
  total?: number;
  status?: string;
  createdAt?: string;
}