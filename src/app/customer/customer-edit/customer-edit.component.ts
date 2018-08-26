import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CustomerService} from '../customer.service';
import {ICustomer} from '../customer';

@Component({
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  customer: ICustomer;

  constructor(private route: ActivatedRoute,
              private customerS: CustomerService) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.customerS.getCustomer(id).subscribe(
      customer => this.customer = customer
    );
  }

  save() {
    if (this.isValid()) {
      this.customerS.save(this.customer.customerID)
        .subscribe(message => {
          console.log(message);
        });
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
