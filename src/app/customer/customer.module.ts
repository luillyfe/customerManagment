import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {CustomerComponent} from './customer.component';
import { GenderPipe } from './gender.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: 'customer', component: CustomerComponent },
    ])
  ],
  declarations: [CustomerComponent, GenderPipe]
})
export class CustomerModule { }
