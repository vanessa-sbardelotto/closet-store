import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductLocalService } from '../../../core/services/product-local';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm implements OnInit {
  private fb = inject(FormBuilder);
  private productLocalService = inject(ProductLocalService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  editingId: number | null = null;

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
      this.editingId = Number(id);
      const product = this.productLocalService.getById(this.editingId);
      if (product) {
        this.form.patchValue({
          name: product.name,
          description: product.description,
          category: product.category,
          size: product.size,
          image: product.image,
          price: product.price
        });
      }
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const formValue = this.form.getRawValue();
    if (this.editingId !== null) {
      this.productLocalService.update({
        id: this.editingId,
        name: formValue.name,
        description: formValue.description,
        category: formValue.category,
        size: formValue.size,
        image: formValue.image,
        price: formValue.price
      });
    } else {
      this.productLocalService.add({
        id: Date.now(),
        name: formValue.name,
        description: formValue.description,
        category: formValue.category,
        size: formValue.size,
        image: formValue.image,
        price: formValue.price
      });
    }
    this.router.navigate(['/produtos']);
  }
}