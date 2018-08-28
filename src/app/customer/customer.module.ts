import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';


import {CustomerComponent} from './customer.component';
import { GenderPipe } from './gender.pipe';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import {CustomerGuard} from './customer.guard';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'customers', component: CustomerComponent },
      { path: 'customers/:id', component: CustomerDetailComponent, resolve: { customer: CustomerGuard } },
      { path: 'customers/:id/edit', component: CustomerEditComponent },
    ])
  ],
  declarations: [CustomerComponent, GenderPipe, CustomerDetailComponent, CustomerEditComponent]
})
export class CustomerModule { }
