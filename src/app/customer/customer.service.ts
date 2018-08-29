import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';

import {ICustomer} from './customer';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  // private customerURl = 'assets/customers.json';
  private customerURl = 'api';

  constructor(private http: HttpClient) {
  }

  getCustomers(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(this.customerURl);
  }

  getCustomer(id: number): Observable<ICustomer> {
    return this.getCustomers().pipe(
      map(customers => customers.find(customer => customer.customerID === id))
    );
  }

  save(customer: ICustomer) {
    if (customer.customerID === -1) {
      return this.http.post(this.customerURl, customer);
    } else {
      return this.http.put(this.customerURl, customer);
    }
  }

  delete(id: number) {
    console.log(id);
    const url = `${this.customerURl}/${id}`;
    return this.http.delete(url);
  }
}
