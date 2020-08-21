import { TestBed } from '@angular/core/testing';

import { SalarieAdapter } from './salarie.adapter';

describe('SalarieService', () => {
  let service: SalarieAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalarieAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
