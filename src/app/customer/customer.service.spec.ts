import { TestBed, inject } from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

import { CustomerService } from './customer.service';
import { ICustomer } from './customer';

const expectedCustomers: ICustomer[] = require('../../assets/customers.json');
let httpClientSpy: { get: jasmine.Spy };

describe('CustomerService', () => {
  let customerService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        CustomerService,
      ]
    });
  });
  beforeEach(inject([CustomerService], s => {
    customerService = s;
    httpClientSpy.get.and.returnValue(of(expectedCustomers));
  }));

  const customerSize = 5;
  it('should be created', () => {
    expect(customerService).toBeTruthy();
  });

  it(`should return ${customerSize} customers`, (done: DoneFn) => {
    customerService.getCustomers().subscribe((customers: ICustomer[]) => {
      expect(customers.length).toEqual(customerSize);
      done();
    });
  });

  const id = 3;
  it( `should return the customer with id ${id}`, (done: DoneFn) => {
    customerService.getCustomer(id).subscribe((customer: ICustomer) => {
      const customerExpected = { lastContact: '2017-08-01T11:57:47.142Z' }
      expect(customer.lastContact).toBe(customerExpected.lastContact);
      done();
    });
  });
});
