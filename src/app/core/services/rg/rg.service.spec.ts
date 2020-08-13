import { TestBed } from '@angular/core/testing';

import { RgService } from './rg.service';

describe('RgService', () => {
  let service: RgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
