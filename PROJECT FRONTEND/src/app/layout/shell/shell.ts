import { Component, computed, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';
import { CartService } from '../../services/cart-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, Sidebar, Topbar],
  templateUrl: './shell.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './shell.css'
})
export class ShellComponent implements OnInit {
  menuOpen = false;
  private cart = inject(CartService);
  private auth = inject(AuthService);

  cartCount = computed(() => this.cart.totalCount());
  signedIn = computed(() => this.auth.isLoggedInSignal()); // ✅ مضاف

  ngOnInit(): void {
    this.auth.isLoggedIn(); // ✅ عشان يضبط الـ signal من أول ما الصفحة تفتح
    if (this.auth.isLoggedIn()) {
      this.cart.loadCart();
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}