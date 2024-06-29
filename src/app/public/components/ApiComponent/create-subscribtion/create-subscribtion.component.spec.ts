import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubscribtionComponent } from './create-subscribtion.component';

describe('CreateSubscribtionComponent', () => {
  let component: CreateSubscribtionComponent;
  let fixture: ComponentFixture<CreateSubscribtionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSubscribtionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubscribtionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
