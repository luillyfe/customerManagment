import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../customer.service';
import {ICustomer} from '../customer';

@Component({
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  customer: ICustomer;

  constructor(private route: ActivatedRoute,
              private customerS: CustomerService,
              private router: Router) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id === -1) {
      this.customer = {
        customerID: -1,
        name: { first: '', last: '' },
        birthday: '',
        gender: '',
        lastContact: '',
        customerLifetimeValue: 0
      };
    } else {
      this.customerS.getCustomer(id).subscribe(
        customer => this.customer = customer
      );
    }
  }

  save() {
    if (this.isValid()) {
      this.customerS.save(this.customer)
        .subscribe(message => {
          console.log(message);
          if (this.customer.customerID === -1) {
            this.router.navigate(['customers']);
          } else {
            this.router.navigate(['customers', this.customer.customerID]);
          }
        });
    }
  }

  cancel() {
    if (this.customer.customerID === -1) {
      this.router.navigate(['customers']);
    } else {
      this.router.navigate(['customers', this.customer.customerID]);
    }
  }

  isValid() {
    if (this.customer.name.first && this.customer.name.last
        && this.customer.birthday && this.customer.gender) {
      return true;
    } else {
      return false;
    }}

}
