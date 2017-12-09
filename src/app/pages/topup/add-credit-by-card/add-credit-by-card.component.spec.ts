import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCreditByCardComponent } from './add-credit-by-card.component';

describe('AddCreditByCardComponent', () => {
  let component: AddCreditByCardComponent;
  let fixture: ComponentFixture<AddCreditByCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCreditByCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCreditByCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
