import { TestBed } from '@angular/core/testing';

import { CouncilDirectoryService } from './council-directory.service';

describe('CouncilDirectoryService', () => {
  let service: CouncilDirectoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouncilDirectoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
