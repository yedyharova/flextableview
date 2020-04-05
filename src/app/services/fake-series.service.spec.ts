import { TestBed } from '@angular/core/testing';

import { SeriesService } from './fake-series.service';

describe('FakeAPIServiceService', () => {
  let service: SeriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
