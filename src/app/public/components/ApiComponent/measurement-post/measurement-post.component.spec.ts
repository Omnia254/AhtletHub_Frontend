import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementPostComponent } from './measurement-post.component';

describe('MeasurementPostComponent', () => {
  let component: MeasurementPostComponent;
  let fixture: ComponentFixture<MeasurementPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasurementPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
