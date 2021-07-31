import { TestBed } from '@angular/core/testing';

import { LoggedinauthgaurdService } from './loggedinauthgaurd.service';

describe('LoggedinauthgaurdService', () => {
  let service: LoggedinauthgaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedinauthgaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
