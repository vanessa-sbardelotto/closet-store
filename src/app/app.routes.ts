import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Products } from './features/products/products';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'cadastro-produto', component: Products },
  { path: '**', redirectTo: '' }
];