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
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.customerS.getCustomer(id).subscribe(
      customer => this.customer = customer
    );
  }

  goBack() {
    this.router.navigate(['customers']);
  }

}
