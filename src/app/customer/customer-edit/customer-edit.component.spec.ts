import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Observable, of} from 'rxjs';

import { CustomerEditComponent } from './customer-edit.component';
import {CustomerService} from '../customer.service';
import {ICustomer} from '../customer';
import {Routes} from '@angular/router';
import {Component, Injectable} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

let mockCustomerS: { save: jasmine.Spy, getCustomer: jasmine.Spy, formatBirthday: jasmine.Spy };
const customer: ICustomer = {
  customerID: 1, name: { first: '', last: '' },
  birthday: '1996-02-02',
  gender: '',
  lastContact: '',
  customerLifetimeValue: 0
};

@Component({ template: '' })
class MockDetailComponent {}

const routes: Routes = [
  { path: 'customers/:id', component: MockDetailComponent }
];
describe('CustomerEditComponent', () => {
  let component: CustomerEditComponent;
  let fixture: ComponentFixture<CustomerEditComponent>;

  beforeEach(async(() => {
    mockCustomerS = jasmine.createSpyObj('CustomerService', ['save', 'getCustomer', 'formatBirthday']);
    TestBed.configureTestingModule({
      imports: [NgbModule, FormsModule, RouterTestingModule.withRoutes(routes), HttpClientTestingModule],
      declarations: [ CustomerEditComponent, MockDetailComponent ],
      providers: [{
        provide: CustomerService, useValue: mockCustomerS
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockCustomerS.getCustomer.and.returnValue(of(customer));
    mockCustomerS.save.and.returnValue(of('success'));
    fixture = TestBed.createComponent(CustomerEditComponent);
    component = fixture.componentInstance;
    spyOn<any>(component, 'formatBirthday').and.returnValue({});
    fixture.detectChanges();
  });

  it('should create Customer-edit component', () => {
    expect(component).toBeTruthy();
  });

  describe('when user clicks on save button', () => {
    it('should call save method on CustomerService', fakeAsync(() => {
      spyOn(component, 'isValid').and.returnValue(true);
      component.save();
      tick();
      expect(mockCustomerS.save).toHaveBeenCalled();
    }));
    it('should call save method on CustomerService', fakeAsync(() => {
      spyOn(component, 'isValid').and.returnValue(false);
      component.save();
      tick();
      expect(mockCustomerS.save).not.toHaveBeenCalled();
    }));
  });
});
