import { TestBed } from '@angular/core/testing';

import { ProductLocal } from './product-local';

describe('ProductLocal', () => {
  let service: ProductLocal;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductLocal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
