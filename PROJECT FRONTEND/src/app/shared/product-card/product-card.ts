
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductInterface } from '../../interfaces/product-interface';

@Component({
    selector: 'app-product-card',
    imports: [RouterLink],
    templateUrl: './product-card.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './product-card.css'
})
export class ProductCard {
  @Input({ required: true }) product!: ProductInterface;
  @Output() addToCart = new EventEmitter<ProductInterface>();

  onAdd(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.product.available) return;
    this.addToCart.emit(this.product);
  }

  categoryLabel(): string {
    return this.product.category.charAt(0).toUpperCase() + this.product.category.slice(1);
  }
}
