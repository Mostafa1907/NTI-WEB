import { ProductInterface } from './product-interface';

export interface CartItem {
  product: ProductInterface;
  quantity: number;
}

export type OrderStatus = 'processing' | 'on-the-way' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: CartItem[];
  total: number;
}
