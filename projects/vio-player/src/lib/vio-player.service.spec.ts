import { TestBed } from '@angular/core/testing';

import { VioPlayerService } from './vio-player.service';

describe('VioPlayerService', () => {
  let service: VioPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VioPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
