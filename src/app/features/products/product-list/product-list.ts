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
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';
    this.productApiService.getAll().subscribe({
      next: (response) => {
        this.products = response;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar produtos.';
        this.loading = false;
      }
    });
  }

  detail(id: string): void {
    this.router.navigate(['/produtos', id]);
  }

  edit(id: string): void {
    this.router.navigate(['/cadastro-produto'], {
      queryParams: { id }
    });
  }

  remove(id: string): void {
    const confirmDelete = confirm('Deseja realmente excluir este produto?');
    if (!confirmDelete) {
      return;
    }
    this.productApiService.delete(id).subscribe({
      next: () => {
        this.successMessage = 'Produto excluído com sucesso.';
        this.loadProducts();
        setTimeout(() => {
          this.successMessage = '';
        }, 2000);
      },
      error: () => {
        this.errorMessage = 'Erro ao excluir produto.';
      }
    });
  }
}