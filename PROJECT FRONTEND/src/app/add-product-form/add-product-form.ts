import { TitleCasePipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CATEGORY_OPTIONS, CategoryOption, ProductInterface } from '../interfaces/product-interface';
import { ProductService } from '../services/product-service';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [ ReactiveFormsModule],
  selector: 'app-add-product-form',
  styleUrl: './add-product-form.css',
  templateUrl: './add-product-form.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class AddProductForm {
  private productService = inject(ProductService);
  private http = inject(HttpClient); 

  @Output() productAdded = new EventEmitter<ProductInterface>();
  @Output() cancelled = new EventEmitter<void>();

  categories: CategoryOption[] = CATEGORY_OPTIONS.filter((c) => c.value !== 'الكل');
  selectedFile: File | null = null;
  isSubmitting = false;

  addProductForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    category: new FormControl('', [Validators.required]),
    price: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    stock: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    brand: new FormControl('', [Validators.required]),
    available: new FormControl<boolean | null>(null, [Validators.required]),
  });

  onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}

 onSubmit(): void {
    if (this.addProductForm.invalid) {
      this.addProductForm.markAllAsTouched();
      return;
    }

    const formValue = this.addProductForm.value;
    const formData = new FormData();
    formData.append('name', formValue.name!);
    formData.append('category', formValue.category!);
    formData.append('price', String(formValue.price));
    formData.append('stock', String(formValue.stock));
    formData.append('brand', formValue.brand!);
    formData.append('available', String(formValue.available));
    if (this.selectedFile) formData.append('image', this.selectedFile);

    this.isSubmitting = true;
    
    // بنعتمد على الـ Service بتاعتك هي اللي تكلم الـ API
    this.productService.addProduct(formData).subscribe({
      next: (product) => {
        this.isSubmitting = false;
        this.addProductForm.reset();
        this.selectedFile = null;
        this.productAdded.emit(product);  
        console.log('تم إضافة المنتج بنجاح', product);
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error('فشل إضافة المنتج:', err.message || err);
      },
    });
 }
}