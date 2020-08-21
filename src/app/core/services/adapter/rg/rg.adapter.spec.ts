import { TestBed } from '@angular/core/testing';

import { RgAdapter } from './rg.adapter';

describe('RgService', () => {
  let service: RgAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RgAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
