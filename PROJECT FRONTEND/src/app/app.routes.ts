import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home').then((m) => m.Home),
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import('./pages/product-details/product-details.component').then(
            (m) => m.ProductDetailsComponent
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/cart/cart').then((m) => m.Cart),
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import('./pages/checkout/checkout').then((m) => m.Checkout),
      },
      
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile').then((m) => m.Profile),
      },
      {
        path: 'help',
        loadComponent: () =>
          import('./pages/help/help').then((m) => m.Help),
      },
    ],
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./pages/admin/admin-dashboard/admin-dashboard.component').then((m) => m.AdminDashboardComponent),
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./pages/user-login/signin-form/signin-form').then((m) => m.SigninForm),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./pages/user-login/signup-form/signup-form').then((m) => m.SignupForm),
  },
 
];
