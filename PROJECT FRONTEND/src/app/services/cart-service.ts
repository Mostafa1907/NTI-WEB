import { HttpClient } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { ProductInterface } from '../interfaces/product-interface';

export interface CartItem {
  product: ProductInterface;
  quantity: number;
}

@Service() 
export class CartService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:5000/api/v1/users/products';

  private rawProducts = signal<ProductInterface[]>([]);

  items = computed<CartItem[]>(() => {
    const map = new Map<string, CartItem>();
    for (const product of this.rawProducts()) {
      const existing = map.get(product.id);
      if (existing) existing.quantity++;
      else map.set(product.id, { product, quantity: 1 });
    }
    return Array.from(map.values());
  });

  subtotal = computed(() =>
    this.items().reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  );

  loadCart() {
    this.httpClient.get<any>(this.baseUrl).subscribe({
      next: (res) => this.rawProducts.set(res.data.myProducts),
      error: (err) => console.error(err.message),
    });
  }

  add(productId: string) {
    this.httpClient.post<any>(this.baseUrl, { productId }).subscribe({
      next: (res) => this.rawProducts.set(res.data.myProducts),
    });
  }

  remove(productId: string) {
    this.httpClient
      .request<any>('delete', this.baseUrl, { body: { productId } })
      .subscribe({ next: (res) => this.rawProducts.set(res.data.myProducts) });
  }

  updateQuantity(productId: string, newQuantity: number) {
  const item = this.items().find((i) => i.product.id === productId);
  const currentQuantity = item ? item.quantity : 0;
  const diff = newQuantity - currentQuantity;

  if (diff === 0) return;

  if (newQuantity <= 0) {
  
    for (let i = 0; i < currentQuantity; i++) this.remove(productId);
    return;
  }
  if (diff > 0) {
    for (let i = 0; i < diff; i++) this.add(productId);
  } else {
    for (let i = 0; i < Math.abs(diff); i++) this.remove(productId);
  }
}
totalCount = computed(() =>
  this.items().reduce((sum, item) => sum + item.quantity, 0),
);

  clear() {
    // الباك اند مفيش فيه endpoint لمسح السلة كلها مرة واحدة،
    // فبنشيل كل item لوحده
    this.items().forEach((item) => this.remove(item.product.id));
  }
}