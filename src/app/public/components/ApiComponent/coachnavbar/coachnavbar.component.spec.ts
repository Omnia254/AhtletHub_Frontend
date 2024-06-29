import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachnavbarComponent } from './coachnavbar.component';

describe('CoachnavbarComponent', () => {
  let component: CoachnavbarComponent;
  let fixture: ComponentFixture<CoachnavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachnavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
