import { TestBed } from '@angular/core/testing';

import { MockCoachServiceService } from './mock-coach-service.service';

describe('MockCoachServiceService', () => {
  let service: MockCoachServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockCoachServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
