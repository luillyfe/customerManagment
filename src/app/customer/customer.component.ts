import { Component, OnInit } from '@angular/core';
import {ICustomer} from './customer';
import {CustomerService} from './customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers: ICustomer[];
  constructor(private customerS: CustomerService) { }

  ngOnInit() {
    this.customerS.getCustomers().subscribe(
      (customers: ICustomer[]) => {
        this.customers = customers;
      }
    );
  }

}
