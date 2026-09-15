import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Service() 
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/v1/orders';

  createOrder(orderData: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}`, orderData).pipe(
    map((res) => res.data.order)
  );
}

  getMyOrders(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/my`).pipe(
      map((res) => res.data.orders)
    );
  }

 getAllOrders(): Observable<any[]> {
  return this.http.get<any>(`${this.apiUrl}/all`).pipe(
    map((res) => res.data.orders)
  );
}
}