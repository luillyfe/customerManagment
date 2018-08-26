import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';

import { CustomerEditComponent } from './customer-edit.component';
import {CustomerService} from '../customer.service';
import {ICustomer} from '../customer';

let mockCustomerS: { save: jasmine.Spy, getCustomer: jasmine.Spy };
const customer: ICustomer = {
  customerID: 3, name: { first: '', last: '' },
  birthday: '',
  gender: '',
  lastContact: '',
  customerLifetimeValue: 0
};
describe('CustomerEditComponent', () => {
  let component: CustomerEditComponent;
  let fixture: ComponentFixture<CustomerEditComponent>;

  beforeEach(async(() => {
    mockCustomerS = jasmine.createSpyObj('CustomerService', ['save', 'getCustomer']);
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [ CustomerEditComponent ],
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

  xdescribe('validate the form', () => {
    it('if there is not name, should invlidate the', () => {

    });
  });

});
