import { TestBed, async, inject } from '@angular/core/testing';

import { CustomerGuard } from './customer.guard';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CustomerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerGuard]
    });
  });

  it('should ...', inject([CustomerGuard], (guard: CustomerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
