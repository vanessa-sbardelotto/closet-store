import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Products } from './features/products/products';
import { ProductList } from './features/products/product-list/product-list';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'cadastro-produto', component: Products },
  { path: 'produtos', component: ProductList },
  { path: '**', redirectTo: '' }
];