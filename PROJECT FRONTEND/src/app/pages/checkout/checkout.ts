import { Component, computed, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart-service';
import { OrderService } from '../../services/order-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink, FormsModule],
  templateUrl: './checkout.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './checkout.css'
})
export class Checkout {

  fullName = '';
  phone = '';
  street = '';
  city = '';
  postalCode = '';

paymentMethod = 'cash'; 
 placing = signal(false);
  cart = inject(CartService);
  private orderService = inject(OrderService);
  private router = inject(Router);

  deliveryFee = computed(() => (this.cart.subtotal() > 0 ? 25 : 0));

  total = computed(() => this.cart.subtotal() + this.deliveryFee());

 

  placeOrder(): void {

    if (this.cart.items().length === 0) {
      return;
    }

    if (
      !this.fullName ||
      !this.phone ||
      !this.street ||
      !this.city ||
      !this.postalCode
    ) {
      alert('Please provide all customer information');
      return;
    }

    this.placing.set(true);

    const orderData = {
      fullName: this.fullName,
      phone: this.phone,
      street: this.street,
      city: this.city,
      postalCode: this.postalCode,
      paymentMethod: this.paymentMethod
    };
    console.log('Order Data:', orderData);

    this.orderService.createOrder(orderData).subscribe({

      next: () => {

        this.cart.loadCart();

        this.placing.set(false);
      },

      error: (err) => {

        console.error('Order failed:', err);

        this.placing.set(false);

      }

    });
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