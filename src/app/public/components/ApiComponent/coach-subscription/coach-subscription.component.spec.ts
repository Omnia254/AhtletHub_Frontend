import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachSubscriptionComponent } from './coach-subscription.component';

describe('CoachSubscriptionComponent', () => {
  let component: CoachSubscriptionComponent;
  let fixture: ComponentFixture<CoachSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
