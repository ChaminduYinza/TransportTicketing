import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapcardComponent } from './swapcard.component';

describe('SwapcardComponent', () => {
  let component: SwapcardComponent;
  let fixture: ComponentFixture<SwapcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwapcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
