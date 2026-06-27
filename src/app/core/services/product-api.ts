import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, push, update, remove } from 'firebase/database';
import { Product } from '../models/product.models';
import { environment } from '../../../environments/environment';

const app = initializeApp(environment.firebase);
const db = getDatabase(app);

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  getAll(): Observable<Product[]> {
    return new Observable(observer => {
      get(ref(db, 'products')).then(snapshot => {
        if (!snapshot.exists()) {
          observer.next([]);
        } else {
          const data = snapshot.val();
          const products = Object.keys(data).map(key => ({ id: key, ...data[key] }));
          observer.next(products);
        }
        observer.complete();
      }).catch(err => observer.error(err));
    });
  }

  getById(id: string): Observable<Product> {
    return new Observable(observer => {
      get(ref(db, `products/${id}`)).then(snapshot => {
        observer.next({ id: snapshot.key!, ...snapshot.val() });
        observer.complete();
      }).catch(err => observer.error(err));
    });
  }

  create(product: Omit<Product, 'id'>): Observable<Product> {
    return new Observable(observer => {
      push(ref(db, 'products'), product).then(ref => {
        observer.next({ id: ref.key!, ...product } as Product);
        observer.complete();
      }).catch(err => observer.error(err));
    });
  }

  update(id: string, product: Omit<Product, 'id'>): Observable<void> {
    return new Observable(observer => {
      update(ref(db, `products/${id}`), product).then(() => {
        observer.next();
        observer.complete();
      }).catch(err => observer.error(err));
    });
  }

  delete(id: string): Observable<void> {
    return new Observable(observer => {
      remove(ref(db, `products/${id}`)).then(() => {
        observer.next();
        observer.complete();
      }).catch(err => observer.error(err));
    });
  }
}