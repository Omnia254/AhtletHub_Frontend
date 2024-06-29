import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateDeactivateUserComponent } from './activate-deactivate-user.component';

describe('ActivateDeactivateUserComponent', () => {
  let component: ActivateDeactivateUserComponent;
  let fixture: ComponentFixture<ActivateDeactivateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateDeactivateUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateDeactivateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
