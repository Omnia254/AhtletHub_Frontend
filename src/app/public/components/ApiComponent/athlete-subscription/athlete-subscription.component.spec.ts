import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteSubscriptionComponent } from './athlete-subscription.component';

describe('AthleteSubscriptionComponent', () => {
  let component: AthleteSubscriptionComponent;
  let fixture: ComponentFixture<AthleteSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AthleteSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AthleteSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
