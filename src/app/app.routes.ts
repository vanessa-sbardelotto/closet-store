import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home').then((m) => m.Home)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then((m) => m.LoginComponent)
  },
  {
    path: 'produtos',
    loadComponent: () =>
      import('./features/products/product-list/product-list').then((m) => m.ProductList),
    canActivate: [authGuard]
  },
  {
    path: 'produtos/:id',
    loadComponent: () =>
      import('./features/products/product-detail/product-detail').then((m) => m.ProductDetail),
    canActivate: [authGuard]
  },
  {
    path: 'cadastro-produto',
    loadComponent: () =>
      import('./features/products/product-form/product-form').then((m) => m.ProductForm),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];