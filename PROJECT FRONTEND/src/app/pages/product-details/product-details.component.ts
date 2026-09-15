import { CommonModule } from '@angular/common';
import { Component, computed, signal, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { CartService } from '../../services/cart-service';
import { ProductInterface } from '../../interfaces/product-interface';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {

  private productService = inject(ProductService);
  private cart = inject(CartService);
  private route = inject(ActivatedRoute);

  quantity = signal(1);
  added = signal(false);

  products = signal<ProductInterface[]>([]);

  product = computed<ProductInterface | undefined>(() => {
    const id = this.route.snapshot.paramMap.get('id');

    return this.products().find((p) => String(p.id) === String(id));
  });

  related = computed<ProductInterface[]>(() => {
    const current = this.product();

    if (!current) {
      return [];
    }

    return this.products()
      .filter(
        (p) =>
          p.category === current.category &&
          p.id !== current.id
      )
      .slice(0, 4);
  });

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products.set(data);
      },
      error: (err) => {
        console.error('فشل تحميل تفاصيل المنتج:', err);
      },
    });
  }

  inc(): void {
    const current = this.product();

    if (!current || this.quantity() >= current.stock) {
      return;
    }

    this.quantity.update((q) => q + 1);
  }

  dec(): void {
    if (this.quantity() > 1) {
      this.quantity.update((q) => q - 1);
    }
  }

  addToCart(): void {
    const p = this.product();

    if (!p || !p.available) {
      return;
    }

    this.cart.add(p.id);

    this.added.set(true);

    setTimeout(() => {
      this.added.set(false);
    }, 1800);
  }
  getImageUrl(imageUrl?: string): string {
  if (!imageUrl) {
    return '';
  }

  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }

  return `http://localhost:5000/api/v1/uploads/products/${imageUrl}`;
}
}