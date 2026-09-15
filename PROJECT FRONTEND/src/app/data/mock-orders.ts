import { Order } from '../interfaces/cart.model';
import { MOCK_PRODUCTS } from './mock-products';

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-10482',
    date: '2026-08-20',
    status: 'delivered',
    items: [
      { product: MOCK_PRODUCTS[2], quantity: 2 },
      { product: MOCK_PRODUCTS[6], quantity: 1 },
    ],
    total: 28 * 2 + 22,
  },
  {
    id: 'ORD-10501',
    date: '2026-08-23',
    status: 'on-the-way',
    items: [
      { product: MOCK_PRODUCTS[0], quantity: 1 },
      { product: MOCK_PRODUCTS[14], quantity: 3 },
    ],
    total: 185 + 19 * 3,
  },
  {
    id: 'ORD-10517',
    date: '2026-08-26',
    status: 'processing',
    items: [{ product: MOCK_PRODUCTS[9], quantity: 2 }],
    total: 65 * 2,
  },
  {
    id: 'ORD-10390',
    date: '2026-08-10',
    status: 'cancelled',
    items: [{ product: MOCK_PRODUCTS[16], quantity: 1 }],
    total: 245,
  },
];
