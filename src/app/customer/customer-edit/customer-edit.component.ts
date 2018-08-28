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
      this.customer = this.initData();
    } else {
      this.customerS.getCustomer(id).subscribe(
        customer => {
          customer.birthday = this.formatBirthday(customer.birthday);
          this.customer = customer;
        }
      );
    }
  }

  save() {
    if (this.isValid()) {
      if (typeof this.customer.birthday !== 'string') {
        this.customer.birthday = this.formatString(this.customer.birthday);
      }
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
    }
  }

  private formatBirthday(birthday: string): any {
    const date = birthday.split('-');
    return { year: Number(date[0]), month: Number(date[1]), day: Number(date[2]) };
  }

  private formatString(birthday: {year: number, month: number, day: number}) {
    return `${birthday.year}-${birthday.month}-${birthday.day}`;
  }

  private initData() {
    return {
      customerID: -1,
      name: { first: '', last: '' },
      birthday: '',
      gender: 'm',
      lastContact: '',
      customerLifetimeValue: 0
    };
  }

}
