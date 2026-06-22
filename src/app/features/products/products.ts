import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductApiService } from '../../core/services/product-api';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {
  private fb = inject(FormBuilder);
  private productApiService = inject(ProductApiService);
  private router = inject(Router);

  loading = false;
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

  submit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const formValue = this.form.getRawValue();

    this.productApiService.create({
      name: formValue.name,
      description: formValue.description,
      category: formValue.category,
      price: formValue.price,
      image: formValue.image,
      size: formValue.size
    }).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Produto cadastrado com sucesso.';
        this.form.reset();
        setTimeout(() => {
          this.router.navigate(['/produtos']);
        }, 1500);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Erro ao cadastrar produto.';
      }
    });
  }
}