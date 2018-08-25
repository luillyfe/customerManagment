import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import {ICustomer} from './customer';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customerURl: 'assets/customers.json';

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(this.customerURl);
  }

  getCustomer(id: number): Observable<ICustomer> {
    return this.getCustomers().pipe(
      map(customers => customers.find(customer => customer.customerID === id))
    );
  }
}
