export type ProductCategory =
  | 'ألبان' | 'المخبز' | 'الفاكهة' | 'الخضراوات'
  | 'اللحوم' | 'المشروبات' | 'مقبلات' | 'منزلي';

export interface ProductInterface {
  id: string;
  name: string;
  brand?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  reviews?: number;
  available?: boolean;
  customers?: number;
  createdAt?: string
  category: ProductCategory;
}

export interface CategoryOption {
  value: ProductCategory | 'الكل';
  label: string;
  icon: string;
}

export const CATEGORY_OPTIONS: CategoryOption[] = [
  { value: 'الكل', label: 'الكل', icon: '✦' },
  { value: 'اللحوم', label: 'اللحوم', icon: '🥩' },
  { value: 'المخبز', label: 'المخبز', icon: '🥐' },
  { value: 'الخضراوات', label: 'الخضراوات', icon: '🥦' },
  { value: 'الفاكهة', label: 'الفاكهة', icon: '🍎' },
  { value: 'مقبلات', label: 'مقبلات', icon: '🍿' },
  { value: 'المشروبات', label: 'المشروبات', icon: '🥤' },
  { value: 'منزلي', label: 'منزلي', icon: '🧴' },
  { value: 'ألبان', label: 'ألبان', icon: '🥛' },
];
