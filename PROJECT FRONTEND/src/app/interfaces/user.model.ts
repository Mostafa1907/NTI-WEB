export type UserRole = 'customer' | 'admin';

export interface User {
  _id: string;
  Name: string;
  email: string;
  role: UserRole;
  phone?: string;
  imageUrl?: string;
  myProducts: string[];
  createdAt?: string;
}
