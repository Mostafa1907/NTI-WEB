import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  products: Product[] = [
    { id: 1, name: 'Wireless Mouse', price: 19.99 },
    { id: 2, name: 'Mechanical Keyboard', price: 49.99 },
    { id: 3, name: 'USB-C Hub', price: 24.99 },
    { id: 4, name: 'Laptop Stand', price: 34.99 },
    { id: 5, name: 'Webcam 1080p', price: 39.99 },
    { id: 6, name: 'Noise-Cancelling Headphones', price: 89.99 },
  ]

  cart = signal<Product[]>([])

  totalPrice = computed(() =>
    this.cart().reduce((sum, product) => sum + product.price, 0)
  )

  itemCount = computed(() => this.cart().length)

  constructor() {
    effect(() => {
      console.log(`Cart items count: ${this.cart().length}`)
    })
  }

  addToCart(product: Product): void {
    this.cart.update(items => [...items, product])
  }

  removeFromCart(product: Product): void {
    this.cart.update(items =>{
      const index = items.findIndex(item => item.id === product.id)
      if (index === -1) {
        return items
      }
      const updated = [...items]
      updated.splice(index, 1)
      return updated
    });
  }

  clearCart(): void {
    this.cart.set([])
  }
}