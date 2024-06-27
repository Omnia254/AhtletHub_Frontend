import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalCalculatecaloryComponent } from './cal-calculatecalory.component';

describe('CalCalculatecaloryComponent', () => {
  let component: CalCalculatecaloryComponent;
  let fixture: ComponentFixture<CalCalculatecaloryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalCalculatecaloryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalCalculatecaloryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
