import { Component, computed, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart-service';
import { EmptyState } from '../../shared/empty-state/empty-state';

@Component({
    selector: 'app-cart',
    imports: [RouterLink, EmptyState],
    templateUrl: './cart.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './cart.css'
})
export class Cart implements OnInit {
  cart = inject(CartService);

  ngOnInit(): void {
    this.cart.loadCart();
  }

  deliveryFee = computed(() => (this.cart.subtotal() > 0 ? 25 : 0));
  total = computed(() => this.cart.subtotal() + this.deliveryFee());

  inc(id: string, current: number): void {
    this.cart.updateQuantity(id, current + 1);
  }

  dec(id: string, current: number): void {
    this.cart.updateQuantity(id, current - 1);
  }

  remove(id: string): void {
    this.cart.remove(id);
  }
  getImageUrl(imageUrl: string | undefined): string {
  if (!imageUrl) {
    return '';
  }

  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }

  return `http://localhost:5000/api/v1/uploads/products/${imageUrl}`;
}
}