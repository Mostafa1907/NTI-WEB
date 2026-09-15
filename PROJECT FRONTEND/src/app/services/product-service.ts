import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import {  map, Observable } from 'rxjs';
import { ProductInterface } from '../interfaces/product-interface';



@Service() 
export class ProductService {
  httpClient = inject(HttpClient);

  baseUrl = 'http://localhost:5000/api/v1/products';

  getAllProducts(): Observable<ProductInterface[]> {
    return this.httpClient.get<any>(this.baseUrl).pipe(
      map((res) => res.data.products)
    )
  }


  getProductById(productId: string): Observable<ProductInterface>{
    return this.httpClient.get<any>(`${this.baseUrl}/${productId}`).pipe(
      map((res) => res.data.product)
    )
  }

  deleteProduct(productId: string): Observable<ProductInterface>{
    return this.httpClient.delete<any>(`${this.baseUrl}/${productId}`).pipe(
      map((res) => res.data.product)
    )
  }

  addProduct(product: FormData): Observable<ProductInterface>{
    return this.httpClient.post<any>(this.baseUrl, product).pipe(
      map((res) => res.data.product)
    )
  }

  updateProduct(productId: string, product: FormData): Observable<ProductInterface> {
  return this.httpClient.patch<any>(`${this.baseUrl}/${productId}`, product).pipe(
    map((res) => res.data.product)
  );
}


}