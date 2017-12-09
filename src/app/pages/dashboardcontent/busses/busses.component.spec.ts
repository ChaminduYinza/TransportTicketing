import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BussesComponent } from './busses.component';

describe('BussesComponent', () => {
  let component: BussesComponent;
  let fixture: ComponentFixture<BussesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BussesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BussesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
