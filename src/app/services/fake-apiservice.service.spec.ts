import { TestBed } from '@angular/core/testing';

import { FakeAPIServiceService } from './fake-apiservice.service';

describe('FakeAPIServiceService', () => {
  let service: FakeAPIServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeAPIServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
