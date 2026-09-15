import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MOCK_ORDERS } from '../../../data/mock-orders';
import { AuthService } from '../../../services/auth-service';
import { ProductService } from '../../../services/product-service';
import { ProductInterface, CATEGORY_OPTIONS, ProductCategory } from '../../../interfaces/product-interface';
import { AddProductForm } from '../../../add-product-form/add-product-form';
import { OrderService } from '../../../services/order-service';
import { Order } from '../../../interfaces/order.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AddProductForm],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  private productService = inject(ProductService);
private orderService = inject(OrderService);
  
  recentOrders = signal<Order[]>([]);
  products: ProductInterface[] = [];
  orders = MOCK_ORDERS;
  categories = CATEGORY_OPTIONS.filter((c) => c.value !== 'الكل');

  showProductForm = false;
  editingProductId: string | null = null;
  selectedEditFile: File | null = null;

  form: {
    name: string;
    category: ProductCategory;
    price: number;
    stock: number;
    brand: string;
    imageUrl: string;
    available: boolean;
  } = this.emptyForm();

  ngOnInit(): void {
    this.loadProducts();
   this.loadAdminOrders();
  }
 loadAdminOrders() {
  this.orderService.getAllOrders().subscribe({
    next: (data) => {
      this.recentOrders.set(data);
      console.log('Orders fetched successfully:', data); // عشان تتأكد في الـ Console
    },
    error: (err) => {
      console.error('Failed to fetch orders:', err);
    }
  });
}
  

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => (this.products = data),
      error: (err) => console.error('فشل تحميل المنتجات', err),
    });
  }

  get revenue() {
  return this.recentOrders()
    .filter(order => order.status !== 'cancelled')
    .reduce((sum, order) => sum + (order.total || 0), 0);
}

  get lowStock() {
    return this.products.filter(product => product.stock > 0 && product.stock <= 15);
  }

  getCategoryCount(category: string): number {
    return this.products.filter(product => product.category === category).length;
  }

  getCategoryBarWidth(category: string): number {
    const max = Math.max(...this.categories.map(item => this.getCategoryCount(item.value)), 1);
    return Math.min((this.getCategoryCount(category) / max) * 100, 100);
  }

  openAddProduct(): void {
    this.editingProductId = null;
    this.form = this.emptyForm();
    this.showProductForm = true;
  }

  openEditProduct(product: ProductInterface): void {
    this.editingProductId = product.id;
    this.form = {
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      brand: product.brand ?? '',
      imageUrl: product.imageUrl ?? '',
      available: product.available ?? true
    };
    this.showProductForm = true;
  }

  closeProductForm(): void {
    this.showProductForm = false;
    this.editingProductId = null;
    this.form = this.emptyForm();
  }

 saveProduct() {
  const formData = new FormData();
  formData.append('name', this.form.name);
  formData.append('brand', this.form.brand);
  formData.append('category', this.form.category);
  formData.append('price', String(this.form.price));
  formData.append('stock', String(this.form.stock));
  formData.append('available', String(this.form.available));

  if (this.selectedEditFile) {
    formData.append('image', this.selectedEditFile);
  }

  this.productService.updateProduct(this.editingProductId!, formData).subscribe({
    next: (res) => {
      console.log('تم التعديل بنجاح', res);
      this.closeProductForm();
      this.loadProducts(); 
    },
    error: (err) => {
      console.error('خطأ في التعديل', err);
    }
  });
}


  onProductCreated(product: ProductInterface): void {
    this.products = [product, ...this.products];
    this.closeProductForm();
  }

  deleteProduct(product: ProductInterface): void {
    const confirmed = window.confirm(`Delete "${product.name}"?`);
    if (!confirmed) return;

    this.productService.deleteProduct(product.id).subscribe({
      next: () => (this.products = this.products.filter(item => item.id !== product.id)),
      error: (err) => console.error('فشل حذف المنتج', err),
    });
  }
  onFileSelected(event: any) {
  this.selectedEditFile = event.target.files[0];
}

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  private emptyForm() {
    return {
      name: '',
      category: 'dairy' as ProductCategory,
      price: 0,
      stock: 0,
      brand: '',
      imageUrl: '',
      available: true
    };
  }
  getImageUrl(imageUrl: string): string {
  if (!imageUrl) {
    return '';
  }

  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }

  return `http://localhost:5000/api/v1/uploads/products/${imageUrl}`;
}
}