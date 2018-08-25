import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import {CustomerComponent} from './customer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'customer', component: CustomerComponent },
    ])
  ],
  declarations: [CustomerComponent]
})
export class CustomerModule { }
