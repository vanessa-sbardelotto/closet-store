import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductApiService } from '../../core/services/product-api';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  private fb = inject(FormBuilder);
  private productApiService = inject(ProductApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  editingId: string | null = null;
  loading = false;
  loadingData = false;
  successMessage = '';
  errorMessage = '';

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    category: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    image: ['', [Validators.required]],
    size: ['', [Validators.required]]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.editingId = id;
      this.loadProduct(this.editingId);
    }
  }

  loadProduct(id: string): void {
    this.loadingData = true;
    this.productApiService.getById(id).subscribe({
      next: (product) => {
        this.form.patchValue({
          name: product.name,
          description: product.description,
          category: product.category,
          price: product.price,
          image: product.image,
          size: product.size
        });
        this.loadingData = false;
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar os dados do produto.';
        this.loadingData = false;
      }
    });
  }

  submit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const formValue = this.form.getRawValue();
    const productData = {
      name: formValue.name,
      description: formValue.description,
      category: formValue.category,
      price: formValue.price,
      image: formValue.image,
      size: formValue.size
    };

    if (this.editingId !== null) {
      this.productApiService.update(this.editingId, productData).subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = 'Produto atualizado com sucesso.';
          setTimeout(() => {
            this.router.navigate(['/produtos']);
          }, 1000);
        },
        error: () => {
          this.loading = false;
          this.errorMessage = 'Erro ao atualizar produto.';
        }
      });
      return;
    }

    this.productApiService.create(productData).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Produto cadastrado com sucesso.';
        this.form.reset();
        setTimeout(() => {
          this.router.navigate(['/produtos']);
        }, 1000);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Erro ao cadastrar produto.';
      }
    });
  }
}