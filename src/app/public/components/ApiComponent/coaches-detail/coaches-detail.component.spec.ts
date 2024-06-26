import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachesDetailComponent } from './coaches-detail.component';

describe('CoachesDetailComponent', () => {
  let component: CoachesDetailComponent;
  let fixture: ComponentFixture<CoachesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
