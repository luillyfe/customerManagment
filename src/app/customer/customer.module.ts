import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {CustomerComponent} from './customer.component';
import { GenderPipe } from './gender.pipe';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: 'customers', component: CustomerComponent },
      { path: 'customers/:id', component: CustomerDetailComponent },
    ])
  ],
  declarations: [CustomerComponent, GenderPipe, CustomerDetailComponent]
})
export class CustomerModule { }
