import { TestBed } from '@angular/core/testing';

import { AcessorioServiceService } from './acessorio-service.service';

describe('AcessorioServiceService', () => {
  let service: AcessorioServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcessorioServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
