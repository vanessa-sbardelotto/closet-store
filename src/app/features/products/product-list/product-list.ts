import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProductLocalService } from '../../../core/services/product-local';
import { Product } from '../../../core/models/product.models';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  private productLocalService = inject(ProductLocalService);
  private router = inject(Router);

  products: Product[] = [];

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.products = this.productLocalService.getAll();
  }

  edit(id: number): void {
    this.router.navigate(['/cadastro-produto'], {
      queryParams: { id }
    });
  }

  remove(id: number): void {
    this.productLocalService.delete(id);
    this.loadProducts();
  }
}