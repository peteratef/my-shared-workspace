import { TestBed } from '@angular/core/testing';

import { MyButtonsService } from './my-buttons.service';

describe('MyButtonsService', () => {
  let service: MyButtonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyButtonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
