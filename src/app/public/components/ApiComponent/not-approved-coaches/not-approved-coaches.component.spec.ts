import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotApprovedCoachesComponent } from './not-approved-coaches.component';

describe('NotApprovedCoachesComponent', () => {
  let component: NotApprovedCoachesComponent;
  let fixture: ComponentFixture<NotApprovedCoachesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotApprovedCoachesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotApprovedCoachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
