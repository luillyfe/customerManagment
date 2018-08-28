import { Component, OnInit } from '@angular/core';
import {ICustomer} from './customer';
import {CustomerService} from './customer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers: ICustomer[];
  constructor(private customerS: CustomerService,
              private router: Router) { }

  ngOnInit() {
    this.customerS.getCustomers().subscribe(
      (customers: ICustomer[]) => {
        this.customers = customers;
      }
    );
  }

  addCustomer() {
    this.router.navigate(['customers', -1, 'edit']);
  }

}
