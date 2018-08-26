import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router, Routes} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Location} from '@angular/common';
import {Component} from '@angular/core';

import { CustomerDetailComponent } from './customer-detail.component';
import {GenderPipe} from '../gender.pipe';

@Component({ template: '' })
class MockEditComponent {}

@Component({ template: '' })
class MockComponent {}

const routes: Routes = [
  { path: 'customers', component: MockComponent },
  { path: 'customers/:id', component: CustomerDetailComponent },
  { path: 'customers/:id/edit', component: MockEditComponent },
  { path: '**', redirectTo: 'customers', pathMatch: 'full' }
];
const id = 3;
describe('CustomerDetailComponent', () => {
  let component: CustomerDetailComponent;
  let fixture: ComponentFixture<CustomerDetailComponent>;
  let router: Router, location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        GenderPipe,
        MockComponent,
        CustomerDetailComponent,
        MockEditComponent
      ],
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(CustomerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to customers page', fakeAsync(() => {
    router.initialNavigation();
    router.navigate(['/customers', id]);
    component.goBack();
    tick();
    expect(location.path()).toBe('/customers');
  }));

  it('should navigate to customers details page', fakeAsync(() => {
    router.initialNavigation();
    router.navigate(['/customers', id]);
    tick();
    expect(location.path()).toBe('/customers/3');
  }));

  it('should navigate to customers edit page', fakeAsync(() => {
    router.initialNavigation();
    component.edit(id);
    tick();
    expect(location.path()).toBe('/customers/3/edit');
  }));
});
