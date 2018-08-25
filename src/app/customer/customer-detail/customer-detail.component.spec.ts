import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router, Routes} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Location} from '@angular/common';

import { CustomerDetailComponent } from './customer-detail.component';
import {CustomerComponent} from '../customer.component';
import {GenderPipe} from '../gender.pipe';

const routes: Routes = [
  { path: 'customers', component: CustomerComponent },
  { path: 'customers/:id', component: CustomerDetailComponent },
  { path: '**', redirectTo: 'customers', pathMatch: 'full' }
];
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
      declarations: [ GenderPipe, CustomerComponent, CustomerDetailComponent ],
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
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/customers');
  }));

  it('should navigate to customers datils page', fakeAsync(() => {
    router.initialNavigation();
    router.navigate(['/customers', 3]);
    tick();
    expect(location.path()).toBe('/customers/3');
  }));
});
