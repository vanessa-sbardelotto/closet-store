import { Injectable } from '@angular/core';
import { Product } from '../models/product.models';

@Injectable({
  providedIn: 'root'
})
export class ProductLocalService {
  private storageKey = 'products';

  getAll(): Product[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveAll(products: Product[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  add(product: Product): void {
    const products = this.getAll();
    products.push(product);
    this.saveAll(products);
  }

  getById(id: string): Product | undefined {
    return this.getAll().find((product) => product.id === id);
  }

  update(updatedProduct: Product): void {
    const products = this.getAll().map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    this.saveAll(products);
  }

  delete(id: string): void {
    const products = this.getAll().filter((product) => product.id !== id);
    this.saveAll(products);
  }
}