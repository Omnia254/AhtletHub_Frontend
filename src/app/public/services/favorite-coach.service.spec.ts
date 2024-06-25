import { TestBed } from '@angular/core/testing';

import { FavoriteCoachService } from './favorite-coach.service';

describe('FavoriteCoachService', () => {
  let service: FavoriteCoachService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteCoachService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
