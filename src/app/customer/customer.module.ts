import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {CustomerComponent} from './customer.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: 'customer', component: CustomerComponent },
    ])
  ],
  declarations: [CustomerComponent]
})
export class CustomerModule { }
