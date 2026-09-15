import { Component, computed, signal, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';  // ✅ ضيف Router
import { ProductCard } from '../../shared/product-card/product-card';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { CATEGORY_OPTIONS, CategoryOption, ProductInterface } from '../../interfaces/product-interface';
import { ProductService } from '../../services/product-service';
import { CartService } from '../../services/cart-service';
import { AuthService } from '../../services/auth-service';  // ✅ ضيف AuthService

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProductCard, EmptyState],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home.css'
})
export class Home implements OnInit {
  private productService = inject(ProductService);
  private cart = inject(CartService);
  private authService = inject(AuthService);  // ✅ مضاف
  private router = inject(Router);            // ✅ مضاف

  categories: CategoryOption[] = CATEGORY_OPTIONS;
  activeCategory = signal<string>('الكل');
  products = signal<ProductInterface[]>([]);

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => this.products.set(data),
      error: (err) => console.error('فشل تحميل المنتجات', err),
    });
  }

  filteredProducts = computed(() => {
    const cat = this.activeCategory();
    const all = this.products();
    if (cat === 'الكل') return all;
    return all.filter((p) => p.category === cat);
  });

  setCategory(value: string): void {
    this.activeCategory.set(value);
  }

  onAddToCart(product: ProductInterface): void {

    if (this.authService.isLoggedIn()) {
      this.cart.add(product.id);
    } else {
      this.router.navigateByUrl('/sign-in');
    }
  }
}