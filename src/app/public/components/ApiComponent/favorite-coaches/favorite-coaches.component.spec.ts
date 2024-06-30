import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteCoachesComponent } from './favorite-coaches.component';

describe('FavoriteCoachesComponent', () => {
  let component: FavoriteCoachesComponent;
  let fixture: ComponentFixture<FavoriteCoachesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteCoachesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteCoachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
