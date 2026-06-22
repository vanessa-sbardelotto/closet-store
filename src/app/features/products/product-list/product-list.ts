import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProductApiService } from '../../../core/services/product-api';
import { Product } from '../../../core/models/product.models';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  private productApiService = inject(ProductApiService);
  private router = inject(Router);

  products: Product[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productApiService.getAll().subscribe({
      next: (response) => {
        this.products = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao buscar produtos:', error);
        this.loading = false;
      }
    });
  }

  detail(id: number): void {
    this.router.navigate(['/produtos', id]);
  }

  edit(id: number): void {
    this.router.navigate(['/cadastro-produto'], {
      queryParams: { id }
    });
  }

  remove(id: number): void {
    console.log('DELETE será implementado na próxima aula.');
  }
}