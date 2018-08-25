import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComponent } from './customer.component';

import {Pipe, PipeTransform} from '@angular/core';
import {CustomerService} from './customer.service';
import {of} from 'rxjs';

@Pipe({name: 'gender'})
class MockPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}

let customerServiceSpy: { getCustomers: jasmine.Spy };

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;

  beforeEach(async(() => {
    customerServiceSpy = jasmine.createSpyObj('HttpClient', ['getCustomers']);
    TestBed.configureTestingModule({
      declarations: [ CustomerComponent, MockPipe ],
      providers: [
        { provide: CustomerService, useValue: customerServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    customerServiceSpy.getCustomers.and.returnValue(of([]));
    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
