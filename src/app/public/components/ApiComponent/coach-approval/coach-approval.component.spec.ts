import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachApprovalComponent } from './coach-approval.component';

describe('CoachApprovalComponent', () => {
  let component: CoachApprovalComponent;
  let fixture: ComponentFixture<CoachApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
