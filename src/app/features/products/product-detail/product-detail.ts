import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductApiService } from '../../../core/services/product-api';
import { Product } from '../../../core/models/product.models';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private productApiService = inject(ProductApiService);

  product?: Product;
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.productApiService.getById(id).subscribe({
      next: (response) => {
        this.product = response;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Não foi possível carregar os detalhes do produto.';
        this.loading = false;
      }
    });
  }
}