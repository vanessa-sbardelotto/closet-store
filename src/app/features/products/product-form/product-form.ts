import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductApiService } from '../../../core/services/product-api';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm implements OnInit {
  private fb = inject(FormBuilder);
  private productApiService = inject(ProductApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  editingId: string | null = null;

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    category: ['', [Validators.required]],
    size: ['', [Validators.required]],
    image: ['', [Validators.required]],
    price: [0, [Validators.required]]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.editingId = id;
      this.productApiService.getById(id).subscribe((product) => {
        this.form.patchValue({
          name: product.name,
          description: product.description,
          category: product.category,
          size: product.size,
          image: product.image,
          price: product.price
        });
      });
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const formValue = this.form.getRawValue();
    const product = {
      name: formValue.name,
      description: formValue.description,
      category: formValue.category,
      size: formValue.size,
      image: formValue.image,
      price: formValue.price
    };

    if (this.editingId !== null) {
      this.productApiService.update(this.editingId, product).subscribe(() => {
        this.router.navigate(['/produtos']);
      });
    } else {
      this.productApiService.create(product).subscribe(() => {
        this.router.navigate(['/produtos']);
      });
    }
  }
}