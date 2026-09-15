import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal,Service } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Service()
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/v1/auth';
  private httpClient = inject(HttpClient);
  private router = inject(Router);

  isLoggedInSignal = signal(this.checkToken()); // ✅ بيتحقق من أول ما الـ service يتعمل

  private checkToken(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
      const decoded = jwtDecode<any>(token);
      const expirationDate = new Date(decoded.exp * 1000);
      if (expirationDate < new Date()) {
        localStorage.removeItem('token');
        return false;
      }
      return true;
    } catch {
      localStorage.removeItem('token');
      return false;
    }
  }

  private getDecodedToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      return jwtDecode<any>(token);
    } catch {
      return null;
    }
  }

  isLoggedIn(): boolean {
    const result = this.checkToken(); // ✅ بيستخدم نفس الـ logic
    this.isLoggedInSignal.set(result);
    return result;
  }

  getRole(): 'admin' | 'customer' | null {
    const decoded = this.getDecodedToken();
    if (!decoded) return null;
    return decoded.role ?? null;
  }

  signin(credentials: { email: string; password: string }) {
    return this.httpClient.post<any>(`${this.baseUrl}/signin`, credentials).pipe(
      tap((res) => {
        this.isLoggedInSignal.set(true); // ✅
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }),
    );
  }

  signup(userData: FormData) {
    return this.httpClient.post<any>(`${this.baseUrl}/signup`, userData).pipe(
      tap((res) => {
        this.isLoggedInSignal.set(true); // ✅
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }),
    );
  }

  logout(): void {
    this.isLoggedInSignal.set(false); // ✅
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}