import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCreditByCashComponent } from './add-credit-by-cash.component';

describe('AddCreditByCashComponent', () => {
  let component: AddCreditByCashComponent;
  let fixture: ComponentFixture<AddCreditByCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCreditByCashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCreditByCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
