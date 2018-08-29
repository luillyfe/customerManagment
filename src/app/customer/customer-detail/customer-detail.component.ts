import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ICustomer} from '../customer';
import {CustomerService} from '../customer.service';

@Component({
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  customer: ICustomer;

  constructor(private route: ActivatedRoute,
              private customerS: CustomerService,
              private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.customer = data.customer;
    });
  }

  goBack() {
    this.router.navigate(['customers']);
  }

  edit(id: number) {
    this.router.navigate(['customers', id, 'edit']);
  }

  delete() {
    this.customerS.delete(this.customer.customerID).subscribe(
      message => {
        console.log(message);
        this.router.navigate(['customers']);
      }
    );
  }
}
