import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import {CustomerService} from './customer.service';
import {ICustomer} from './customer';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements Resolve<ICustomer> {
  constructor(private customerS: CustomerService) {}
  resolve(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<ICustomer> {
    const id = Number(next.params.id);
    return this.customerS.getCustomer(id);
  }
}
