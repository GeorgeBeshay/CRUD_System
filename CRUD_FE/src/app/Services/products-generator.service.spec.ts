import { TestBed } from '@angular/core/testing';

import { ProductsGeneratorService } from './products-generator.service';

describe('ProductsGeneratorService', () => {
  let service: ProductsGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
